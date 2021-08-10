let yourvotefor = document.querySelector(".d-1-1 span");
let office = document.querySelector(".d-1-2 span");
let description = document.querySelector(".d-1-4");
let notice = document.querySelector(".d-2");
let side = document.querySelector(".d-1-right");
let numbers = document.querySelector(".d-1-3");

let phasenow = 0;
let number = '';
let votewhite = false;
let votes = [];

function startphase()
{
    let phase = phases[phasenow];

    let numberHtml = ''
    number = '';
    votewhite = false;
    for(let i = 0; i < phase.numbers; i++)
    {
        if(i === 0)
        {
            numberHtml += '<div class="number blinks"></div>';
        }
        else{
             numberHtml += '<div class="number"></div>';
        }
       
    }

    yourvotefor.style.display = 'none';
    office.innerHTML = phase.title;
    description.innerHTML = '';
    notice.style.display = 'none';
    side.innerHTML = '';
    numbers.innerHTML = numberHtml;
}
function updateinterface()
{
   let phase = phases[phasenow];
   let candidate = phase.candidates.filter((item)=>{
       if(item.number === number)
       {
           return true;
       }
       else
       {
           return false;
       }
   })
   if(candidate.length > 0)
   {
       candidate = candidate[0];
       yourvotefor.style.display = 'block';
       notice.style.display = 'block';
       if(number.length == 2)
       {
         description.innerHTML = `Name: ${candidate.name} <br/> Vice: ${candidate.vice} <br/> Party: ${candidate.party}`  
       }
       else
       {
        description.innerHTML = `Name: ${candidate.name} <br/> Party: ${candidate.party}`
       }
       

       let photosHtml = '';
       for(let i in candidate.photos)
       {
           if(candidate.photos[i].small)
           {
            photosHtml += `<div class="d-1-image blinks" small>
            <img src="img/${candidate.photos[i].url}" alt="">
            ${candidate.photos[i].subtitle}</div>`;
           }
           else
           {
                photosHtml += `<div class="d-1-image blinks">
                        <img src="img/${candidate.photos[i].url}" alt="">
                        ${candidate.photos[i].subtitle}</div>`;
           }
           
       }

       side.innerHTML = photosHtml;
   }
   else
    {
        yourvotefor.style.display = 'block';
        notice.style.display = 'block';
        description.innerHTML = `<div class="warning--big blinks">vote NULO<div>`
   }
}

function clicou(n)
{
    let elnumber = document.querySelector(".number.blinks");
    if(number !== null)
    {
        elnumber.innerHTML = n;
        number = `${number}${n}`;

        elnumber.classList.remove('blinks')
        if(elnumber.nextElementSibling !== null)
        { 
        elnumber.nextElementSibling.classList.add("blinks")
        }
        else
        {
            updateinterface();
        }
    }
}
function white()
{
    if(number === '')
    {
        votewhite = true;
        yourvotefor.style.display = 'block';
        notice.style.display = 'block';
        numbers.innerHTML = '';
        description.innerHTML = `<div class="warning--big blinks">Vote white<div>`
    }
    else if(number.length > 4)
    {
        alert("Click on 'CORRECT' to vote for white.")
    }
    else
    {
        alert("To vote in white, you cannot have entered any number!")
    }

}
function correct()
{
    startphase();
}
function confirm()
{
    let phase = phases[phasenow];

    let voteconfirm = false;
    if(votewhite === true)
    {
        voteconfirm = true;
        votes.push({
            phase: phases[phasenow].title,
            vote:'white'
        })
    }
    else if(number.length === phase.numbers)
    {
        voteconfirm = true;
        votes.push({
            phase: phases[phasenow].title,
            vote: number
        })
    }
    if(voteconfirm == true)
    {
        phasenow++;
        if(phases[phasenow] !== undefined)
        {
            startphase();
        }
        else
        {
            document.querySelector('.d-1-left').innerHTML = ``
            document.querySelector('.d-1-left').innerHTML = `<div class="warning--giant blinks">END<div>`
            console.log(votes);
            yourvotefor.style.display = 'none';
            description.innerHTML = '';
            notice.style.display = 'none';
            side.innerHTML = '';
            
        }
    }

}

startphase();
