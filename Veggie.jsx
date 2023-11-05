import { useEffect, useState} from "react";
import styled from "styled-components";
import {Splide,SplideSlide} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Veggie(){

    const [veggie,setVeggie] =useState([]);

    useEffect(() =>{
        getVeggie();
    },[]);

    const getVeggie = async() =>{

        const check = localStorage.getItem("veggie");
        if (check){
            setVeggie(JSON.parse(check));
        }else{
            const api = await fetch ('https://api.spoonacular.com/recipes/random?apiKey=47782361e7e4403faa83a406152198c8&number=4&tags=vagiterian');

            const data= await api.json();

            localStorage.setItem("veggie",JSON.stringify(data.recipes));
            setVeggie(data.recipes);
            console.log(data.recipes);    
        }  
    };

    return (
        <div>
             <Wrapper>
                <h3>Vegitarian Picks</h3>
                <Splide
                        options={{
                            perPage:3,
                            arrows:false,
                            pagination:false,
                            drag:"free",
                            gap:"2rem",
                        }}
                >
                        {veggie.map((recipe)=>{
                            return(
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title}/>
                                        <Gradient/>
                                    </Card>
                                </SplideSlide>
                            );
                        })}
                </Splide>
            </Wrapper>
         </div>
    );
}

const Wrapper = styled.div`
    margin: 2rem 0rem;
`;

const Card = styled.div`
    min-height:25rem;
    border-radius: 2rem;
    overflow: hidden;
    position:relative;

    img{
        border-radius :  2rem;
        position:absolute;
        left:0;
        width:60%;
        height:60%;
        object-fit:cover;
    }
    p  {
        position:absolute;
        z-index:10;
        left:50%;
        bottom:0%;
        transform:translate(-50%,0%);
        color:white;
        width:100%;
        text-aligh:center;
        font-weight:600:
        font-size:1rem;
        height:30%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
   
`;
const Gradient = styled.div`
z-index:3;
position:absolute;
width:80%;
height:80%;
backgroud:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;
 

export default Veggie;