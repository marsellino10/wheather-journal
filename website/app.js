/* Global Variables */
const keyOfApi = "b375c585afeabf5e2e969fee6992028d";
const genBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

                //////////////////////////////////////////////////////////////////
                             /* start declaring of functions */      
                             
/*
    @functionName: getTempFromApi
    @functionDescreption: fetch the data from the api by the zip code and return the value of tempreture only in celsius
    @functionParameter: the zip code 
*/
async function getTempFromApi(zCode){
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zCode}&appid=${keyOfApi}&units=metric`;
    
    let data = await fetch(url);
    data = await data.json();
        
    const temp = data.main.temp;
    return temp;
}

/*
    @functionName: postReq
    @functionDescreption: posting the data
    @functionParameter: the tempreture value and the content in the feeling area of the user 
*/
async function postReq(temp,content){
    await fetch('/postData', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: temp,
            date: newDate,
            content: content
        })
    });
}

/*
    @functionName: getFinalData
    @functionDescreption: get the final data (temp,date,content) and convert it to json
    @functionParameter: none 
*/
async function getFinalData(){

    let finalData = await fetch('getData');
    finalData = await finalData.json();

    return finalData;
}

/*
    @functionName: domWrite
    @functionDescreption: update the UI with the data dynamically
    @functionParameter: finalData (temp,date,content) 
*/
function domWrite(finalData){
    document.getElementById('date').innerHTML    = "date: "         + finalData.date;
    document.getElementById('temp').innerHTML    = "temp: "         + finalData.temp;
    document.getElementById('content').innerHTML = "your feeling: " + finalData.content;
}

                               /* end declaring of functions */

/**add eventlistner to the generate button */
genBtn.addEventListener('click', async () => {

    try{
        const zCode   =  document.getElementById('zip').value;
        const content = document.getElementById('feelings').value;

        if(!zCode){
            alert("zip code field is empty! ");
            return;
        }

        if(!content){
            alert("your feeling field is empty! ");
            return;
        }

        const temp = await getTempFromApi(zCode);


        await postReq(temp,content);

        const finalData = await getFinalData();

        await domWrite(finalData);
   }

   catch(error){
       console.log("error: ",error);
   }

});
