const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectedOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectedOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "The Haunted Orphanage",
        options: [
            {
                text: "Start Chapter 1",
                setState: {startChapter1: true},
                nextText: 2
            },

            {
                text: "Start Chapter 2",
                setState: {startChapter2: true},
                nextText: 29
            },
        ]
    },

    {
        id: 2,
        text: "You come across a envelope on your parents' dresser when snooping for Christmas presents. What do you do?",
        options: [
            {
                text: "Look at the envelope",
                requiredState: (currentState) => currentState.startChapter1,
                setState: {startChapter1: false, lookAtEnvelope: true},
                nextText: 3
            },

            {
                text: "Leave the envelope",
                requiredState: (currentState) => currentState.startChapter1,
                setState: {startChapter1: false, ignoreEnvelope: true},
                nextText: 15,
            },
        ]
    },

    {
        id: 3,
        text: "You look at the letter and see that it is addressed to your mom from someone named, Alice.",
        options: [
            {
                text: "Take the letter out of the envelope",
                requiredState: (currentState) => currentState.lookAtEnvelope,
                setState: {lookAtEnvelope: false, letter: true},
                nextText: 4
            },

            {
                text: "Ignore the envelope",
                requiredState: (currentState) => currentState.lookAtEnvelope,
                setState: {lookAtEnvelope: false, youIgnore: true},
                nextText: 16
            },
        ]
    },

    {
        id: 4,
        text: "You read through the letter and, after doing some research, you find out that your mom used to be in an orphanage that has since burned down due to unforeseen circumstances. What do you do now?",
        options: [
            {
                text: "Go to your best friend's house to go exploring",
                requiredState: (currentState) => currentState.letter,
                setState: {letter: false, bestFriendHouse: true},
                nextText: 5
            },

            {
                text: "Go ask your mom about the letter",
                requiredState: (currentState) => currentState.letter,
                setState: {letter: false, talkToMom: true},
                nextText: 17
            },
        ]
    },

    {
        id: 5,
        text: "You reach your best friend's house with the letter and explain to them what happened. What are you going to do?",
        options: [
            {
                text: "Go with your best friend to explore the orphanage",
                requiredState: (currentState) => currentState.bestFriendHouse,
                setState: {bestFriendHouse: false, goToTheOrphanage: true},
                nextText: 6
            },

            {
                text: "Stay put and debate what this all could mean",
                requiredState: (currentState) => currentState.bestFriendHouse,
                setState: {bestFriendHouse: false, stayAndDebate: true},
                nextText: 18
            },
        ]
    },

    {
        id: 6,
        text: "You and your friend reach the half-burned, abandoned orphanage. The front door is open and a ghostly call echoes from the inside. Do you dare enter?",
        options: [
            {
                text: "Enter the house with your friend",
                requiredState: (currentState) => currentState.goToTheOrphanage,
                setState: {goToTheOrphanage: false, enterTheOrphanage: true},
                nextText: 7
            },

            {
                text: "Explore outside for a while",
                requiredState: (currentState) => currentState.goToTheOrphanage,
                setState: {goToTheOrphanage: false, exploreOutside: true},
                nextText: 19
            },
        ]
    },

    {
        id: 7,
        text: "The front door slams shut behind you and you try to open it, only to find it locked. You look back towards your friend and see three paths. Which way do you go?",
        options: [
            {
                text: "The library on the left",
                requiredState: (currentState) => currentState.enterTheOrphanage,
                setState: {enterTheOrphanage: false, toTheLibrary: true},
                nextText: 8
            },

            {
                text: "The hallway in front of you",
                requiredState: (currentState) => currentState.enterTheOrphanage,
                setState: {enterTheOrphanage: false, toTheHallway: true},
                nextText: 20
            },

            {
                text: "The living room on the right",
                requiredState: (currentState) => currentState.enterTheOrphanage,
                setState: {enterTheOrphanage: false, toTheLivingRoom: true},
                nextText: 21
            },
        ]
    },

    {
        id: 8,
        text: "Walking into the library, you see a chest against the wall with a red circle next to it. What do you do?",
        options: [
            {
                text: "Open the chest",
                requiredState: (currentState) => currentState.toTheLibrary,
                setState: {toTheLibrary: false, openTheChest: true},
                nextText: 9
            },

            {
                text: "Investigate the circle",
                requiredState: (currentState) => currentState.toTheLibrary,
                setState: {toTheLibrary: false, investigateTheCircle: true},
                nextText: 23
            },

            {
                text: "Go back to the main entrance",
                requiredState: (currentState) => currentState.toTheLibrary,
                setState: {toTheLibrary: false, backToTheEntrance: true},
                nextText: 22
            },
        ]
    },

    {
        id: 9,
        text: "You open the chest and find 5 chalk pieces and a book. You pick up the chalk as your friend grabs the book. What do you do?",
        options: [
            {
                text: "Read the book",
                requiredState: (currentState) => currentState.openTheChest,
                setState: {openTheChest: false, readTheBook: true},
                nextText: 10
            },

            {
                text: "Find what the chalk is for",
                requiredState: (currentState) => currentState.openTheChest,
                setState: {openTheChest: false, pickUpChalk: true},
                nextText: 24
            },
        ]
    },

    {
        id: 10,
        text: "Your friend reads the book and you learn that there is a girl named Mary stuck here and she is being tortured by Alice: the girl who wrote the letter to your mom. What is your next choice?",
        options: [
            {
                text: "Continue to read the book",
                requiredState: (currentState) => currentState.readTheBook,
                setState: {readTheBook: false, continueToRead: true},
                nextText: 11
            },

            {
                text: "Find a way out of the orphanage",
                requiredState: (currentState) => currentState.readTheBook,
                setState: {readTheBook: false, findWayOut: true},
                nextText: 25
            },
        ]
    },
    
    {
        id: 11,
        text: "You continue to read and learn that you must put the chalk on all 5 of Alice's red circles in order to save Mary from Alice's torture. Do you want to save Mary?",
        options: [
            {
                text: "Save Mary",
                requiredState: (currentState) => currentState.continueToRead,
                setState: {continueToRead: false, saveMary: true},
                nextText: 12
            },

            {
                text: "Try to leave the orphanage",
                requiredState: (currentState) => currentState.continueToRead,
                setState: {continueToRead: false, tryToLeave: true},
                nextText: 26
            },
        ]
    },

    {
        id: 12,
        text: "You place the chalk on the first red circle and a demonic screech is heard throughout the orphanage. What now?!",
        options: [
            {
                text: "Run to the front doors!",
                requiredState: (currentState) => currentState.saveMary,
                setState: {saveMary: false, runToTheDoors: true},
                nextText: 13
            },

            {
                text: "Find the next circle",
                requiredState: (currentState) => currentState.saveMary,
                setState: {saveMary: false, findNextCircle: true},
                nextText: 27
            },
        ]
    },

    {
        id: 13,
        text: "You and your best friend race to the entrance doors. You and your friend frantically pull on the doors when Alice starts singing.",
        options: [
            {
                text: "Adventure to find the circles",
                requiredState: (currentState) => currentState.runToTheDoors,
                setState: {runToTheDoors: false, adventureToFindCircles: true},
                nextText: 14
            },

            {
                text: "Try to find the key to the front door",
                requiredState: (currentState) => currentState.runToTheDoors,
                setState: {runToTheDoors: false, tryToFindKey: true},
                nextText: 28
            },
        ]
    },

    {
        id: 14,
        text: "You choose to adventure further into the orphanage to find the circles and free Mary from Alice.",
        options: [
            {
                text: "Chapter Completed. Click ->HERE<- to go back to the chapter selection.",
                nextText: -1,
            }
        ]
    },

    {
        id: 15,
        text: "You continue on your present hunt and get curious. You look at the envelope and see it is addressed to your mom from someone named, Alice.",
        options: [
            {
                text: "Take the letter out of the envelope",
                requiredState: (currentState) => currentState.ignoreEnvelope,
                setState: {ignoreEnvelope: false, letter: true},
                nextText: 4
            },

            {
                text: "Ignore the envelope",
                requiredState: (currentState) => currentState.ignoreEnvelope,
                setState: {ignoreEnvelope: false, youIgnore: true},
                nextText: 16
            },
        ]
    },

    {
        id: 16,
        text: "You take one last look at the envelope and decide to pick it up. What do you do now?",
        options: [
            {
                text: "Go to your best friend's house to go exploring",
                requiredState: (currentState) => currentState.youIgnore,
                setState: {youIgnore: false, bestFriendHouse: true},
                nextText: 5
            },

            {
                text: "Go ask your mom about the letter",
                requiredState: (currentState) => currentState.youIgnore,
                setState: {youIgnore: false, talkToMom: true},
                nextText: 17
            },
        ]
    },

    {
        id: 17,
        text: "You get into a heated argument with your mom and run to your best friend's house to vent to them. What are you going to do?",
        options: [
            {
                text: "Go with your best friend to explore the orphanage",
                requiredState: (currentState) => currentState.talkToMom,
                setState: {talkToMom: false, goToTheOrphanage: true},
                nextText: 6
            },

            {
                text: "Stay put and debate what this all could mean",
                requiredState: (currentState) => currentState.talkToMom,
                setState: {talkToMom: false, stayAndDebate: true},
                nextText: 18
            },
        ]
    },

    {
        id: 18,
        text: "You and your friend talk for a while and they convince you that you need to investigate. You and your friend reach the half-burned, abandoned orphanage. The front door is open and a ghostly call echoes from the inside. Do you dare enter?",
        options: [
            {
                text: "Enter the house with your friend",
                requiredState: (currentState) => currentState.stayAndDebate,
                setState: {stayAndDebate: false, enterTheOrphanage: true},
                nextText: 7
            },

            {
                text: "Explore outside for a while",
                requiredState: (currentState) => currentState.stayAndDebate,
                setState: {stayAndDebate: false, exploreOutside: true},
                nextText: 19
            },
        ]
    },
    
    {
        id: 19,
        text: "You decide that the best thing to do is stay outside but as you start to look around at the surrounding trees, your best friend goes inside. You run after them and the front door slams shut behind you. You try to open it, only to find it locked. You look back towards your friend and see three paths. Which way do you go?",
        options: [
            {
                text: "The library on the left",
                requiredState: (currentState) => currentState.exploreOutside,
                setState: {exploreOutside: false, toTheLibrary: true},
                nextText: 8
            },

            {
                text: "The hallway in front of you",
                requiredState: (currentState) => currentState.exploreOutside,
                setState: {exploreOutside: false, toTheHallway: true},
                nextText: 20
            },

            {
                text: "The living room on the right",
                requiredState: (currentState) => currentState.exploreOutside,
                setState: {exploreOutside: false, toTheLivingRoom: true},
                nextText: 21
            },
        ]
    },

    {
        id: 20,
        text: "Walking into the hallway, you look down the right of the hallway and see a dark figure. What do you do?",
        options: [
            {
                text: "Run down the other side of the hallway",
                requiredState: (currentState) => currentState.toTheHallway,
                setState: {toTheHallway: false, runAwayFromFigure: true},
                nextText: 30
            },

            {
                text: "Walk towards the figure",
                requiredState: (currentState) => currentState.toTheHallway,
                setState: {toTheHallway: false, walkToTheFigure: true},
                nextText: 31
            },

            {
                text: "Go back to the main entrance",
                requiredState: (currentState) => currentState.toTheHallway,
                setState: {toTheHallway: false, backToTheEntrance: true},
                nextText: 22
            },
        ]
    },

    {
        id: 21,
        text: "Your friend walks away to the living room to find the fireplace lit. When you walk in, the fire goes out and you feel a chill down your spine as you hear a little girl giggling. What do you do?",
        options: [
            {
                text: "Look around the room more",
                requiredState: (currentState) => currentState.toTheLivingRoom,
                setState: {toTheLivingRoom: false, lookAroundRoom: true},
                nextText: 32
            },

            {
                text: "Investigate the fireplace",
                requiredState: (currentState) => currentState.toTheLivingRoom,
                setState: {toTheLivingRoom: false, investigateTheFireplace: true},
                nextText: 34
            },

            {
                text: "Go back to the main entrance",
                requiredState: (currentState) => currentState.toTheLivingRoom,
                setState: {toTheLivingRoom: false, backToTheEntrance: true},
                nextText: 22
            },
        ]
    },

    {
        id: 22,
        text: "You and your friend walk back to the front entrance, but the door is still locked. What do you do now?",
        options: [
            {
                text: "The library on the left",
                requiredState: (currentState) => currentState.backToTheEntrance,
                setState: {backToTheEntrance: false, toTheLibrary: true},
                nextText: 8
            },

            {
                text: "The hallway in front of you",
                requiredState: (currentState) => currentState.backToTheEntrance,
                setState: {backToTheEntrance: false, toTheHallway: true},
                nextText: 20
            },

            {
                text: "The living room on the right",
                requiredState: (currentState) => currentState.backToTheEntrance,
                setState: {backToTheEntrance: false, toTheLivingRoom: true},
                nextText: 21
            },
        ]
    },

    {
        id: 23,
        text: "You kneel down and touch the circle which starts to glow red. You jump back with surprise, feeling that you two aren't alone. What do you do?",
        options: [
            {
                text: "Open the chest",
                requiredState: (currentState) => currentState.investigateTheCircle,
                setState: {investigateTheCircle: false, openTheChest: true},
                nextText: 9
            },

            {
                text: "Go back to the main entrance",
                requiredState: (currentState) => currentState.investigateTheCircle,
                setState: {investigateTheCircle: false, backToTheEntrance: true},
                nextText: 22
            },
        ]
    },

    {
        id: 24,
        text: "You look to your friend and they read the book. You learn you have to place the chalk on all 5 of Alice's red circles. What is your next choice?",
        options: [
            {
                text: "Continue to read the book",
                requiredState: (currentState) => currentState.pickUpChalk,
                setState: {pickUpChalk: false, continueToRead: true},
                nextText: 11
            },

            {
                text: "Find a way out of the orphanage",
                requiredState: (currentState) => currentState.pickUpChalk,
                setState: {pickUpChalk: false, findWayOut: true},
                nextText: 25
            },
        ]
    },

    {
        id: 25,
        text: "Your friend throws the book back into the chest, slamming it down and you keep the chalk. You and your friend wander about the library, searching for the front door key when you look to Alice's red circle. What is your next choice?",
        options: [
            {
                text: "Save Mary",
                requiredState: (currentState) => currentState.findWayOut,
                setState: {findWayOut: false, saveMary: true},
                nextText: 12
            },

            {
                text: "Try to leave the orphanage",
                requiredState: (currentState) => currentState.findWayOut,
                setState: {findWayOut: false, tryToLeave: true},
                nextText: 26
            },
        ]
    },

    {
        id: 26,
        text: "Your friend tries to walk through the door with you when the door slams, making you stumble backwards and you see a piece of chalk on Alice's circle. A demonic screech is heard throughout the orphanage. What is your next choice?",
        options: [
            {
                text: "Run to the front doors!",
                requiredState: (currentState) => currentState.tryToLeave,
                setState: {tryToLeave: false, runToTheDoors: true},
                nextText: 13
            },

            {
                text: "Find the next circle",
                requiredState: (currentState) => currentState.tryToLeave,
                setState: {tryToLeave: false, findNextCircle: true},
                nextText: 27
            },
        ]
    },

    {
        id: 27,
        text: "You grab onto your friend and start to walk out of the library to go to the hallway when you try the front doors again. When you do, Alice starts to sing.",
        options: [
            {
                text: "Adventure to find the circles",
                requiredState: (currentState) => currentState.findNextCircle,
                setState: {findNextCircle: false, adventureToFindCircles: true},
                nextText: 14
            },

            {
                text: "Try to find the key to the front door",
                requiredState: (currentState) => currentState.findNextCircle,
                setState: {findNextCircle: false, tryToFindKey: true},
                nextText: 28
            },
        ]
    },

    {
        id: 28,
        text: "You decide that this is enough adventure for the day and realize that you need to escape.",
        options: [
            {
                text: "Chapter Completed. Click ->HERE<- to go back to the chapter selection.",
                nextText: -1,
            }
        ]
    },

    {
        id: 29,
        text: "The dev has not released Chapter 2 yet. Please be patient while it is under construction.",
        options: [
            {
                text: "This chapter is unavailable at the moment. Click ->HERE<- to go back to the chapter selection.",
                nextText: -1,
            }
        ]
    },

    {
        id: 30,
        text: "You get spooked and you and your friend run down the left hallway and end up in the library. You scan the room and see a chest and a red circle next to it. What is your next choice?",
        options: [
            {
                text: "Open the chest",
                requiredState: (currentState) => currentState.runAwayFromFigure,
                setState: {runAwayFromFigure: false, openTheChest: true},
                nextText: 9
            },

            {
                text: "Investigate the circle",
                requiredState: (currentState) => currentState.runAwayFromFigure,
                setState: {runAwayFromFigure: false, investigateTheCircle: true},
                nextText: 23
            },
        ]
    },

    {
        id: 31,
        text: "You take a brave step forward and the figure turns to look at you with glowing red eyes that pierce your very soul. You turn and run with your friend hot on your heels, ducking into the nearest room for cover and slam the door shut. You look around the room, realizing this is the library, and see a chest and a red circle next to it. What do you do now?",
        options: [
            {
                text: "Open the chest",
                requiredState: (currentState) => currentState.walkToTheFigure,
                setState: {walkToTheFigure: false, openTheChest: true},
                nextText: 9
            },

            {
                text: "Investigate the circle",
                requiredState: (currentState) => currentState.walkToTheFigure,
                setState: {walkToTheFigure: false, investigateTheCircle: true},
                nextText: 23
            },
        ]
    },

    {
        id: 32,
        text: "You look around the room a bit, curious about how the fire went out. You walk over to the window to see if you can open it, when you see the reflection of a red eyed demon behind you. You turn and see only your friend there. What is your next choice?",
        options: [
            {
                text: "Run to the library",
                requiredState: (currentState) => currentState.lookAroundRoom,
                setState: {lookAroundRoom: false, runToLibrary: true},
                nextText: 33
            },

            {
                text: "Investigate the fireplace",
                requiredState: (currentState) => currentState.lookAroundRoom,
                setState: {lookAroundRoom: false, investigateTheFireplace: true},
                nextText: 34
            },
        ]
    },

    {
        id: 33,
        text: "You grab onto your friend and run into the library, trying to work out in your head what you had just witnessed in the window reflection. You look around the room and see a chest with a red circle next to it. What is your next choice?",
        options: [
            {
                text: "Open the chest",
                requiredState: (currentState) => currentState.runToLibrary,
                setState: {runToLibrary: false, openTheChest: true},
                nextText: 9
            },

            {
                text: "Investigate the circle",
                requiredState: (currentState) => currentState.runToLibrary,
                setState: {runToLibrary: false, investigateTheCircle: true},
                nextText: 23
            },
        ]
    },

    {
        id: 34,
        text: "You cautiously walk over to the fireplace and see a skull in the embers of the fireplace. You grab you friend's wrist and drag your oblivious friend out of this demonic room and run into the library where it's hopefully safer. You then see a chest and a red circle next to the chest. What do you do now?",
        options: [
            {
                text: "Open the chest",
                requiredState: (currentState) => currentState.investigateTheFireplace,
                setState: {investigateTheFireplace: false, openTheChest: true},
                nextText: 9
            },

            {
                text: "Investigate the circle",
                requiredState: (currentState) => currentState.investigateTheFireplace,
                setState: {investigateTheFireplace: false, investigateTheCircle: true},
                nextText: 23
            },
        ]
    },

]

startGame()

//Ending the game (restart)
/*
    {
        id: _,
        text: "",
        options: [
            {
                text: "",
                nextText: -1,
            }
        ]
    },
 */