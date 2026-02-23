let interviewList =[];
let rejectedList = [];      

let totalCount = document.getElementById('total')
let interviewCount = document.getElementById('interview')
let rejectedCount = document.getElementById('rejected')

const totalFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('all-cards')
const mainContainer = document.querySelector('main')
const filterSection =document.getElementById('filtered-section')

// console.log(mainContainer);
function calculateCount(){
    totalCount.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}
calculateCount()

function toggleStyle(id){
//adding white bg for all
  totalFilterBtn.classList.add('bg-white', 'text-[#64748B]')
  interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]')
  rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]')
//if any button has blue than remove
      totalFilterBtn.classList.remove('bg-blue-500', 'text-white')
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
  rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')


    const selected = document.getElementById(id)
//adding blue bg for current button
 selected.classList.remove('bg-white', 'text-[#64748B]')
  selected.classList.add('bg-blue-500', 'text-white')

if (id == 'interview-filter-btn'){
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden')
}
else if (id == 'all-filter-btn'){
    allCardSection.classList.remove('hidden')
    filterSection.classList.add('hidden')
}
}
//add evenListener

mainContainer.addEventListener('click',function(event){


   if(event.target.classList.contains('interview-btn'))
    
   {
    const parentNode = event.target.parentNode.parentNode.parentNode;

    const companyName = parentNode.querySelector('.companyName').innerText
    const skill =parentNode.querySelector('.skill').innerText
      const jobType =parentNode.querySelector('.jobType').innerText
        const notes =parentNode.querySelector('.notes').innerText
        

    
        parentNode.querySelector('.status').innerText = 'Interview'

        // const cardInfo ={
        //     companyName,
        //     skill,
        //     jobType,
        //     status:'Interview',
        //     notes
            
        // };
         rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        const jobExist = interviewList.find(item=> item.companyName == companyName)  
         
 if(!jobExist){
    interviewList.push({ companyName, skill, jobType, status: 'Interview', notes });
 }
 
  renderList (interviewList) ;
  calculateCount();
}
else if (event.target.classList.contains('rejected-btn')) {

    const companyName = parentNode.querySelector('.companyName').innerText;
    const skill = parentNode.querySelector('.skill').innerText;
    const jobType = parentNode.querySelector('.jobType').innerText;
    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.status').innerText = 'Rejected';

    // const cardInfo = {
    //     companyName,
    //     skill,
    //     jobType,
    //     status: 'Rejected',
    //     notes
    // };
       interviewList = interviewList.filter(item => item.companyName !== companyName);

    const jobExist = rejectedList.find(item => item.companyName == companyName);

    if (!jobExist) {
        rejectedList.push({ companyName, skill, jobType, status: 'Rejected', notes });
    }

    renderList(rejectedList);
    calculateCount();
}

   } 

);

 function renderList (){
filterSection.innerHTML = '';


for(let interview of interviewList){
    console.log(interview);
    let div = document.createElement('div');
    div.className =' flex justify-between  rounded-md shadow-md p-6'

    const isInterview = interview.status === 'Interview';
  const isRejected = interview.status === 'Rejected';
  
    div.innerHTML =` 
    
             <div class="card-1-child-1 space-y-6">

                 <div>
                     <h2 class="companyName   text-[#002C5C] font-semibold pb-2">${interview.companyName}</h2>
                  <h2 class="skill    text-[#64748B] ">${interview.skill}</h2>
                 </div>
                  <h3 class="jobType   text-[#64748B]">${interview.jobType}</h3>
                  <button class="status  bg-[#EEF4FF] text-[#002C5C] px-3 py-2 rounded-sm">${interview.status}</button>
                  <p class="notes  text-[#323B49]">${interview.notes}</p>
                  <div class="space-x-3">
                       <button class="interview-btn  px-5 py-1 rounded-[8px] text-[#10B981] border border-[#10B981] font-medium">interview</button>
                       <button class="rejected-btn  px-5 py-1 rounded-[8px] text-[#EF4444] border  border-[#EF4444] font-medium">Rejected</button>
                  </div>
             </div>
             <div class="card-1-child-2 ">
                <button><img src="./image/Group 1.png" alt=""></button>
             </div>
    `
    filterSection.appendChild(div)
}
 }