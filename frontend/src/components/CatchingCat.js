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
import {getRandomRange} from '/src/util/math.js';
import MissingCat from '/static/images/cats/undefined.png';
import SlideHorizontalWindow from "./dynamic/SlideHorizontalWindow";

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
        console.log(hour);
        /**
         * the timings set by Catpocalypse members of when day, night,dawn and dusk is defined
         */
        if (hour >= 20 || hour < 5){
            console.log("1");
            gradient = nightTimeGradient;
        }
        if (hour >= 5 && hour < 6){
            console.log("2");
            gradient = dawnGradient;
        }
        if (hour >= 6 && hour < 19){
            console.log("3");
            gradient = dayTimeGradient;
        }
        if (hour >= 19 && hour < 20){
            console.log("4");
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
                top: "25%"
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
            <div className="center">
            <img src={loadCatImageFromId(catId)} width={200} style={catAnimStyling}/>
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
                variant="h4"
                x="0px"
                y="0px"
                size="large"
                anchor = "top left"
                onClick={() => {
                    if (callback!=null){
                        callback();
                    }
                }}
                >
                    <ArrowBackRounded style = {{color:'white'}}/>
                    <Typography variant="h4" component="h4" style={{color: "white"}}>Back</Typography>
                </IconButton>
                <div
                x="20px"
                y="20px"
                anchor = "bottom right"
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
            </OverlayUI>
        </div>
     );
     
 }
