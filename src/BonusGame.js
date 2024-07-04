import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function BonusGame({score, setScore}){
    let imageHeightValue = "175px";

    const[id, setID] = useState("");
    const[ingredient, setIngredient] = useState("");
    const[recipeImage1, setRecipeImage1] = useState("https://images.pexels.com/photos/3026802/pexels-photo-3026802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
    const[recipeImage2, setRecipeImage2] = useState("https://images.pexels.com/photos/3026802/pexels-photo-3026802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
    const[recipeImage3, setRecipeImage3] = useState("https://images.pexels.com/photos/3026802/pexels-photo-3026802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
    const[recipeTitle1, setRecipeTitle1] = useState("");
    // const[recipeTitle2, setRecipeTitle2] = useState("");
    const[recipeTitle3, setRecipeTitle3] = useState("");

    const[checkBoxLabel1, setCheckBoxLabel1] = useState("Picture 1");
    const[isChecked1, setIsChecked1] = useState(false);
    // const[checkBoxLabel2, setCheckBoxLabel2] = useState("Picture 2");
    // const[isChecked2, setIsChecked2] = useState(false);
    const[checkBoxLabel3, setCheckBoxLabel3] = useState("Picture 3");
    const[isChecked3, setIsChecked3] = useState(false);

    const checkHandler = () => {
        setIsChecked1(!isChecked1)
    }
    // const checkHandler2 = () => {setIsChecked2(!isChecked2)}
    const checkHandler3 = () => {setIsChecked3(!isChecked3)}

    // useEffect(() =>{

    // }, [ingredient])

    async function fetchIngredient(ingredientName){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        let urlString = "https://api.spoonacular.com/recipes/search?query="+ingredientName+"&apiKey=49731ab381b24450981eafd9df6a69b0";

        fetch(urlString, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            // console.log(result.results[0].id);
            setID(result.results[0].id);
        })
        .catch((error) => console.error(error));
    }

    function getImageByID(id){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let urlString = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey=49731ab381b24450981eafd9df6a69b0";
        // console.log(urlString);
        
        fetch(urlString, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                setRecipeImage3(result.image);
                // setRecipeTitle3(result.title);
            })
            .catch((error) => console.error(error));
    }

    function fetchRandomRecipe(setImageFunction, setTitleFunction) {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        
        fetch("https://api.spoonacular.com/recipes/random?apiKey=49731ab381b24450981eafd9df6a69b0", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result.recipes[0]);
                setImageFunction(result.recipes[0].image);
                // console.log(result.recipes[0].title); //NOT WORKING FOR SOME REASON
                // setTitleFunction(result.recipes[0].title);
            })
            .catch((error) => console.error(error));
    }

    function checkAnswer(recipeTitle1){
        console.log("Test");
        if(isChecked3){
            setCheckBoxLabel3("Picture 3 is Correct! Nice Sleuthing!" + recipeTitle3);
        } 
        if(isChecked1) {
            setCheckBoxLabel1("Picture 1 is probably incorrect...maybe...you decide, here's the name of the Recipe: " + recipeTitle1);
        }
        // if(isChecked2){
        //     setCheckBoxLabel2("Picture 2 is probably incorrect...maybe...you decide, here's the name of the Recipe: " + recipeTitle2);
        // }
    }

    return(
        <>
            <br/>
            <br/>
            <Typography variant='h5'>
                Bonus Game:
            </Typography>
            <Typography variant='h6'>
                Type an ingredient name and guess which of the pictures below include that item.
            </Typography>
            <TextField id="outlined-controlled"
                label="Ingredient name"
                onChange={(event) => {
                    // console.log(event.target.value);
                    setIngredient(event.target.value);
            }}/>
            <Button 
                variant="outlined"
                onClick={() => {
                    fetchIngredient(ingredient);
                    getImageByID(id);
                    // console.log(recipeTitle3);
                    fetchRandomRecipe(setRecipeImage1, setRecipeTitle1);
                    // fetchRandomRecipe(setRecipeImage2, setRecipeTitle2);
                }
                }
            >
                Submit
            </Button>
            <br/>
            <img src={recipeImage1} height={imageHeightValue}/>{'    '}
            {/* <img src={recipeImage2} height={imageHeightValue}/>{'    '} */}
            <img src={recipeImage3} height={imageHeightValue}/>
            <br/>
            <div>
                <input type="checkbox" id="checkbox1" checked={isChecked1} onChange={checkHandler}/>
                <label htmlFor="checkbox1">{checkBoxLabel1}</label>
                {/* <br/>
                <input type="checkbox" id="checkbox2" checked={isChecked2} onChange={checkHandler2}/>
                <label htmlFor="checkbox2">{checkBoxLabel2}</label> */}
                <br/>
                <input type="checkbox" id="checkbox3" checked={isChecked3} onChange={checkHandler3}/>
                <label htmlFor="checkbox3">{checkBoxLabel3}</label>
            </div>
            <Button 
                variant="outlined"
                onClick={() => {
                    checkAnswer(recipeTitle1);
                }
                }
            >
                Check Answer
            </Button>
        </>
    )

}
