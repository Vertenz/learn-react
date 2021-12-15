import React, {useEffect, useRef, useState} from 'react';
import '../App.css'
import ProjectBlock from "./ProjectBlock";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom"
import Stand from '../images/adventure/persona/first.png'
import Move1 from '../images/adventure/persona/Step1.png'
import Move2 from '../images/adventure/persona/Step2.png'
import Move3 from '../images/adventure/persona/Step3.png'
import Move4 from '../images/adventure/persona/Step4.png'
import Move5 from '../images/adventure/persona/Step5.png'


function Adventure(props) {
    let history = useHistory()

    const text = 'Arrow to move. Mouse to teleport. Space to interact'
    let [showMessage, setShowMessage] = useState(false)
    let [el, setEl] = useState({})

    const root = useRef(document)
    const personaRef = useRef()
    const activeBlock = useRef()
    const taskRef = useRef()
    const nuxtRef = useRef()
    const phpRef = useRef()
    const vueRef = useRef()
    const reactRef = useRef()


    const projects = [
        {
            id: 1,
            name: 'Test project HTML CSS JS + webpack',
            year: 2021,
            link: 'https://github.com/Vertenz/task1/tree/prod',
            page: 'https://vertenz.github.io/task1/',
            description: 'HTML5, SCSS, simple adaptive (media response), vanilla JS(ES 6), webpack (html-webpack-plugin, clean-webpack-plugin, mini-css-extract-plugin, copy-webpack-plugin)'
        },
        {
            id: 2,
            name: 'Prototype of Del’ta website Nuxt',
            year: 2021,
            link: 'https://github.com/Vertenz/nuxt-delta/tree/prod',
            page: false,
            description: 'Vue, Nuxt (axios, pwa, robots), Vuetify, PHP (mailer, SOAP)'
        },
        {
            id: 3,
            name: 'PHP training project',
            year: 2020,
            link: 'https://github.com/Vertenz/phpOOP',
            page: false,
            description: 'Try to create php framework'
        },
        {
            id: 4,
            name: 'Prototype of Del’ta website Vue',
            year: 2020,
            link: 'https://vertenz.github.io/delta/',
            page: 'https://github.com/Vertenz/delta/tree/gitPages',
            description: 'Vue, PHP (mailer, SOAP)'
        },
        {
            id: 5,
            name: 'React training project',
            year: 2021,
            link: 'https://github.com/Vertenz/learn-react',
            page: false,
            description: 'This is that project ( u r seeing it now :) )'
        },
    ]

    const animationArr = [Stand, Move1, Move2, Move3, Move4, Move5]

    let nowMove = 0

    class ActiveBlock {
        constructor(el) {
            this.el = el
        }

        get getStart() {
            return this.start = this.el.getBoundingClientRect().left
        }

        get getEnd() {
            return this.end = this.el.getBoundingClientRect().right - 50
        }
    }

    function changeMove(arr, el, n) {
        n < 4 ? el.src = arr[n] : el.src = arr[0]
    }


    function active(e) {
            if (e.key === 'ArrowRight') {
                nowMove < 4 ? nowMove++ : nowMove = 0
                changeMove(animationArr, personaRef.current, nowMove)
                let leftPosition = getComputedStyle(personaRef.current).left.replace(/\p{L}/gu, "")
                personaRef.current.style.left = `${+leftPosition + 5}px`
                // eslint-disable-next-line no-unused-expressions
                leftPosition >= window.screen.availWidth - 150 ? personaRef.current.style.left = `${+leftPosition - 25}px` : false
            }
            if (e.key === 'ArrowLeft') {
                nowMove < 4 ? nowMove++ : nowMove = 0
                changeMove(animationArr, personaRef.current, nowMove)
                let leftPosition = getComputedStyle(personaRef.current).left.replace(/\p{L}/gu, "")
                personaRef.current.style.left = `${+leftPosition - 5}px`
                leftPosition = getComputedStyle(personaRef.current).left.replace(/\p{L}/gu, "")
                // eslint-disable-next-line no-unused-expressions
                5 > leftPosition ? personaRef.current.style.left = `15px` : null
            }

        if (e.code === 'Space') {
            const arrActiveZone = [
                new ActiveBlock(taskRef.current), new ActiveBlock(nuxtRef.current), new ActiveBlock(phpRef.current),
                new ActiveBlock(vueRef.current), new ActiveBlock(reactRef.current)
            ]
            const leftPosition = getComputedStyle(personaRef.current).left.replace(/\p{L}/gu, "")
            addBlockInfo(leftPosition, arrActiveZone, e)
        }
    }

    function teleport(e) {
        personaRef.current.style.left = `${e.x}px`
    }

    function addBlockInfo(leftPosition, arr, e) {
        for (let i = 0; i < arr.length; i++) {
            if (leftPosition >= arr[i].getStart && leftPosition <= arr[i].getEnd) {
                if (e.repeat === false) {
                    setEl(projects[i])
                    setShowMessage((showMessage) => !showMessage)
                    break
                }
            }
        }
    }

    function checkClientWidth() {
        const width = window.innerWidth
        if (width < 1024) {
          const goToText =  window.confirm('Minimum width size is 1024px. Please use Test Version. Do you want go to Text Version?')
           goToText && history.push('/just-text')
        }
        return false
    }

    useEffect(() => {
        if (props.showDescription === true) {
            props.changeShow()
        }
        checkClientWidth()
        activeBlock.current.addEventListener('click', teleport)
        root.current.addEventListener('keydown', active)
    }, [])

    return (
        <div className='adventure'>
            <h3>{text}</h3>
            {showMessage ? <div className="message">
                    <ProjectBlock project={el}/>
                </div>
                : null}
            <div className="game-zone" ref={activeBlock}>
                <div className="game-zone__active game-zone__active_small" ref={taskRef}></div>
                <div className="game-zone__active" ref={nuxtRef}></div>
                <div className="game-zone__active game-zone__active_big" ref={phpRef}></div>
                <div className="game-zone__active game-zone__active_small" ref={vueRef}></div>
                <div className="game-zone__active" ref={reactRef}></div>
                <img src={Stand} alt="player" className='game-zone__player' id='persona' ref={personaRef}/>
            </div>
        </div>
    );
}

export default Adventure;
