import "../css/Home.css"
import { useState, useEffect } from "react";

export function Home(){

    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [member, setMembers] = useState("");

    useEffect(() => {  
        heading();
        members();
      }, []);

      const heading = ()=>{
        const textToType = "EXPLORE REALITY";
        let currentText = "";
        let index = 0;
    
        const timer = setInterval(() => {
          currentText += textToType[index];
          setText(currentText);
          index++;
    
          if (index === textToType.length) {
            clearInterval(timer);
          }
        }, 150);
      }

      const members = ()=>{
        const textToType = `Designed By:
        Ayesha Amjad,
        Ayesha Zafar,
        Saad Randhawa`;
        let currentText = "";
        let index = 0;
    
        const timer = setInterval(() => {
          currentText += textToType[index];
          setMembers(currentText);
          index++;
    
          if (index === textToType.length) {
            clearInterval(timer);
          }
        }, 100);
      }

    async function handleSubmit(event) {
      event.preventDefault();
  
      const userInput = document.getElementById("user-input").value;
    console.log(userInput);
    try{
        setLoading(true);
        const response = await fetch("/getResult", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ userInput })
          });
      
          const responseData = await response.json();
          if(responseData.error || !responseData){
            alert(responseData.error);
            window.location.reload();
          }
          console.log(responseData);
          setResult(responseData.result);
    }catch(err){console.log(err)
    }finally {
        setLoading(false);
      }
      
    }      

    return(
        
        <div className="homepage">
            <div className="background-wrapper">
                <h1 className="h1 fw-bold text-white text-center" style={{paddingTop:"3rem", color:" #00FF00"}}>FAKE NEWS DETECTION</h1>
                <h3 className="h3 fw-bold text-white text-center" style={{color:" #00FF00"}}>{text}</h3>
                <form method="post">
                <div className="d-flex flex-row justify-content-around">
                    <div className="card text-white my-4" style={{width: "18rem", border:"none",backdropFilter: "blur(2px) saturate(100%)",background: "rgba(0,128,0, 0.5)"}} >
                        <div className="mx-2 card-body">
                            <h5 className="card-title text-center">Write Any News In Urdu</h5>
                            <textarea type="text" name="" id="user-input" className="homeupload" style={{border: "1px solid green", borderRadius: "0.5rem", padding:"0.5rem"}} cols="30" rows="2" placeholder="Enter text here in urdu...." required></textarea>
                            <button type="submit" className="my-1" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
                </form>
                {loading ? (
                    <div className="loader">
                        <div className="spinner-border text-white" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mx-1 my-1 text-white">Please wait.... it will take sometime</p>
                    </div>
                    ):(
                        <span className="visually-hidden">Loading...</span>
                    )
                }
                {
                    result==="real"?(
                        <p className="h1 fw-bold text-center text-success">{result}</p>
                    ):(
                        <p className="h1 fw-bold text-center text-danger">{result}</p>
                    )
                }
                
            </div>
            <p className="text-center fw-bold" style={{marginTop:"6rem", fontSize:"1.5rem", color:" #00FF00"}}>{member}</p>
        </div>
    );

}



// export default Home;