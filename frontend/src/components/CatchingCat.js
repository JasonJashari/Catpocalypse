/**
 * The Catching Cats page is used to allow players to catch cats from the map view
 */
/**
 * The imports which are required for the CatchingCat.js page to run which includes packages from React and other files which exist.
 */
import React, { useState } from "react";
import {Typography, IconButton, Button, Slider, Grid} from "@material-ui/core";
import OverlayUI from "./dynamic/OverlayUI";
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import MissingCat from '/static/images/cats/undefined.png';
import SlideHorizontalWindow from "./dynamic/SlideHorizontalWindow";
import { useSpring, animated } from 'react-spring';
import HookImg from '/static/images/hooks.png';
import ModalWindow from "./dynamic/ModalWindow";
import {getRandomRange, getIntRandomRange} from '/src/util/math.js';

function Catnip(){
    return (
        <button 
            style={{
            height: "100px",
            width: "100px",
            borderRadius: 500,
            }}
            >
            <img src={MissingCat} style={{padding: "13px"}} height="100%"/>
        </button>
    );
}

/**
 * The main function for CatchingCat.js
 * @param {catId} param {callback} 
 * @returns gets activated when the user clicks on a cat on the map and displays the cat which needs to be caught
 */ 
export default function CatchingCat({
     catId = 1,
     callback=null
 }){
     const [showCatnip, setShowCatnip] = useState(false);
     const [hookAnimState, setHookAnimState] = useState(-1)
     const [failHookAnimState, setFailHookAnimState] = useState(-1)
     const [successModal, setSuccessModal] = useState(false)
     /**
      * 
      */
     const hookAnim = useSpring({
        from: {
            bottom: "1000px",
            
        },
        to: {
            bottom: "200px",
            
        },
        reverse: hookAnimState == 1,
        pause: hookAnimState == 2 || hookAnimState < 0,
        delay: 0,
        onRest: () => {
            setHookAnimState(hookAnimState+1);
            setSuccessModal(true);
        },
      })
      
      const failhookAnim = useSpring({
        from: {
            bottom: "1000px",
            
        },
        to: {
            bottom: "200px",
            
        },
        reverse: failHookAnimState == 1,
        pause: failHookAnimState == 2 || failHookAnimState< 0,
        delay: 0,
        onRest: () => {
            setFailHookAnimState(failHookAnimState+1);
        },
      })

      const catAnim = useSpring({
        from: {
            top: "50%",
            
        },
        to: {
            top: "0%",
            
        },
        delay: 0,
      })
    /**
     * 
     * @returns background depending on the time during the 24 hour period, i.e day, night, dawn and dusk.
     */
    const chooseGradient = () =>{
        
        const dayTimeGradient ={
            background: "rgb(66,75,28)",
            background: "linear-gradient(0deg, rgba(66,75,28,1) 0%, rgba(125,214,55,1) 53%, rgba(131,223,242,1) 63%, rgba(45,217,251,1) 100%)"  
            
        }
        const nightTimeGradient ={
            background: "rgb(16,43,19)",
            background: "linear-gradient(0deg, rgba(16,43,19,1) 0%, rgba(52,149,91,1) 53%, rgba(54,64,173,1) 63%, rgba(15,100,201,1) 100%)"
        }
        const duskGradient = {
            background: "rgb(8,29,10)",
            background: "linear-gradient(0deg, rgba(8,29,10,1) 0%, rgba(15,84,44,1) 53%, rgba(168,96,48,1) 63%, rgba(34,65,94,1) 100%)"
        }
        const dawnGradient = {
            background: "rgb(19,48,16)",
            background: "linear-gradient(0deg, rgba(19,48,16,1) 0%, rgba(45,110,75,1) 53%, rgba(219,141,126,1) 63%, rgba(109,136,170,1) 100%)",
        }
        var gradient = dayTimeGradient;
        const d = new Date(); //checks the current date
        let hour = d.getHours(); // checks the current time from the hour
        /**
         * the timings set by Catpocalypse members of when day, night,dawn and dusk is defined
         */
        if (hour >= 20 || hour < 5){
            gradient = nightTimeGradient;
        }
        if (hour >= 5 && hour < 6){
            gradient = dawnGradient;
        }
        if (hour >= 6 && hour < 19){
            gradient = dayTimeGradient;
        }
        if (hour >= 19 && hour < 20){
            gradient = duskGradient;
        }
        return (gradient);
    }

    /**
     * Variable which returns a specific cat from the map to continue the process of catching.
     */
    const loadCatImageFromId = (id) =>{
        return `/static/images/cats/${id}.png`
    }  
     /**
      * Returns the cat which needs to be caught
      */

    const getCatData = () =>{
        return ({name: "Wild Cat", health: 10, maxHealth: 20})
    }

    const closeWindow = () => {
        if (callback!=null){
            callback();
        }
    }

    var randomBounceTime = getRandomRange(0.3,1);
    var catAnimStyling = {
        animation: `bounce ${randomBounceTime}s infinite alternate`,
        webkitAnimation: `bounce ${randomBounceTime}s infinite alternate`
    }
    var catData = getCatData();
    
     return (
        <div style={{
             ...chooseGradient(), 
             width: "100%",
             height: "100%"
        }}>
            <ModalWindow 
				title="CATCHA!" 
				content="You caught a cat!" 
                open={true}
				openState={successModal}
				onClick={_=>{ closeWindow()}}
				buttonText="Continue"
				/>
            <div 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <div
                style={{
                position: "absolute",
                backgroundColor: "rgba(1,1,1,0.4)",
                transform: "skew(20deg)",
                borderRadius: 10,
                zIndex: 10000,
                width: "50%",
                height: "50px",
                top: "25%",
                display: hookAnimState < 1 ? "block" : "none"
                }}
                >
                    <Typography variant="h5" component="h5" style={{
                        color: "white",
                        transform: "skew(-20deg)"
                    }}
                        >
                        {catData.name} HP: {catData.health}/{catData.maxHealth}
                    </Typography>
                    <Slider
                    defaultValue={(catData.health/catData.maxHealth) * 100}
                    valueLabelDisplay="auto"
                    color="#9EE6C9"
                    disabled
                    style={{
                        transform: "skew(-20deg)"
                    }}
                    />
                </div>
            </div>
            <div>
                <div className="center">
                    <img src={loadCatImageFromId(catId)} width={200}
                    style={{
                        ...catAnimStyling,
                        display: hookAnimState < 1 ? "block" : "none"
                    }}
                    />
                </div>
            </div>
                <SlideHorizontalWindow
                open={showCatnip}
                callback={() => setShowCatnip(false)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4} alignItems="center">
                            <Catnip/>
                        </Grid>
                        <Grid item xs={4} alignItems="center">
                            <Catnip/>
                        </Grid>
                        <Grid item xs={4} alignItems="center">
                            <Catnip/>
                        </Grid>
                    </Grid> 
                </SlideHorizontalWindow>

            <OverlayUI>
                <IconButton
                style={{
                    display: hookAnimState < 1 ? "block" : "none"
                }}
                variant="h4"
                x="0px"
                y="0px"
                size="large"
                anchor = "top left"
                onClick={() => {
                    closeWindow();
                }}
                >
                    <ArrowBackRounded style = {{color:'white'}}/>
                    <Typography variant="h4" component="h4" style={{color: "white"}}>Back</Typography>
                </IconButton>
                <div
                x="20px"
                y="20px"
                anchor = "bottom right"
                style={{
                    display: hookAnimState < 1 ? "block" : "none"
                }}
                >
                    <IconButton
                    variant="contained"
                    size="large" 
                    style={{ 
                        borderRadius: 500, 
                        background: "rgba(255, 255, 255, 0.5)" 
                    }}
                    fullWidth={true}
                    onClick={() => setShowCatnip(true)}
                    >
                        <img src={MissingCat} style={{padding: "3px"}}width={40}/>
                        
                    </IconButton>
                    
                </div>
                <div
                y="100px"
                anchor = "bottom middle"
                style={{
                    display: hookAnimState < 1 ? "block" : "none"
                }}
                >
                    <div className="center">
                        <IconButton
                        variant="contained"
                        size="large" 
                        style={{ 
                            borderRadius: 500, 
                            background: "rgba(255, 255, 255, 0.5)" 
                        }}
                        fullWidth={true}
                        onClick={() => {
                            if (hookAnimState == 0 || failHookAnimState == 0 || hookAnimState == 1 || failHookAnimState == 1){
                                return;
                            }
                            var catchChance = 20
                            if (getIntRandomRange(0,100) < catchChance){
                                setHookAnimState(0);
                            }else{
                                setFailHookAnimState(0);
                            }
                        }}
                        >
                            <img src={MissingCat} style={{padding: "3px"}}width={120}/>
                            
                        </IconButton>
                    </div>
                    
                </div>
                <animated.img 
                y="200px"
                anchor = "bottom middle"
                src={HookImg} 
                width={200}
                style={hookAnim}
                /> 
                <animated.img 
                y="200px"
                anchor = "bottom middle"
                src={HookImg} 
                width={200}
                style={failhookAnim}
                /> 
                <animated.img 
                y="200px"
                anchor = "bottom middle"
                src={loadCatImageFromId(catId)} 
                width={120}
                style={{
                    ...hookAnim,
                    display: hookAnimState == 1 ? "block" : "none"
                }}
                />        
            </OverlayUI>
        </div>
     );
     
 }
