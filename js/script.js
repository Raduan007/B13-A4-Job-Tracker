let interviewList =[];
let rejectedList = [];      

let totalCount = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');
let availableJobsCount = document.querySelector('h2:nth-of-type(2)');

const totalFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('all-cards')
const mainContainer = document.querySelector('main')
const filterSection =document.getElementById('filtered-section')
const noJobsDiv = document.getElementById('no-jobs');

//count update
function calculateCount() {
    const totalCards = allCardSection.querySelectorAll('.shadow-md').length;
    totalCount.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    // Only update Available Jobs count for Interview or Rejected filters
    if (interviewFilterBtn.classList.contains('bg-blue-500')) {
        availableJobsCount.innerText = `${interviewList.length} of ${totalCards} Jobs`;
    } else if (rejectedFilterBtn.classList.contains('bg-blue-500')) {
        availableJobsCount.innerText = `${rejectedList.length} of ${totalCards} Jobs`;
    } else {
        // All filter visible
        availableJobsCount.innerText = `${totalCards} Jobs`;
    }
}



// jobs click
function checkNoJobs() {
    const totalCards = allCardSection.querySelectorAll('.shadow-md').length;
    const interviewCountCards = interviewList.length;
    const rejectedCountCards = rejectedList.length;

    if (totalCards === 0 && interviewCountCards === 0 && rejectedCountCards === 0) {
        noJobsDiv.classList.remove('hidden');
    } else {
        noJobsDiv.classList.add('hidden');
    }
}

//status
function updateStatusStyle(statusBtn, status) {
    statusBtn.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]');
    statusBtn.classList.remove('bg-green-100', 'text-green-600');
    statusBtn.classList.remove('bg-red-100', 'text-red-600');

    if (status === 'Interview') {
        statusBtn.classList.add('bg-green-100', 'text-green-600');
    } else if (status === 'Rejected') {
        statusBtn.classList.add('bg-red-100', 'text-red-600');
    } else {
        statusBtn.classList.add('bg-[#EEF4FF]', 'text-[#002C5C]');
    }
}


//filtering button
function toggleStyle(id){
//adding white bg for all
  totalFilterBtn.classList.add('bg-white', 'text-[#64748B]')
  interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]')
  rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]')
//if any button has blue than remove
      totalFilterBtn.classList.remove('bg-blue-500', 'text-white')
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
  rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')

//adding blue bg for current button
    const selected = document.getElementById(id)
 selected.classList.remove('bg-white', 'text-[#64748B]')
  selected.classList.add('bg-blue-500', 'text-white')

if (id === 'interview-filter-btn'){
     renderList(interviewList);
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden')
}
else if (id === 'rejected-filter-btn'){
      renderList(rejectedList);
    allCardSection.classList.remove('hidden')
    filterSection.classList.add('hidden')
}
else{
     allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
}
calculateCount();
    checkNoJobs();
}
//handle click

mainContainer.addEventListener('click',function(event){


    if (event.target.classList.contains('interview-btn') || event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.closest('.shadow-md');
        const companyName = parentNode.querySelector('.companyName').innerText;
        const skill = parentNode.querySelector('.skill').innerText;
        const jobType = parentNode.querySelector('.jobType').innerText;
        const notes = parentNode.querySelector('.notes').innerText;
        const statusBtn = parentNode.querySelector('.status');

        // Interview
        if (event.target.classList.contains('interview-btn')) {
            statusBtn.innerText = 'Interview';
            updateStatusStyle(statusBtn, 'Interview');
            rejectedList = rejectedList.filter(item => item.companyName !== companyName);
            if (!interviewList.find(item => item.companyName === companyName)) {
                interviewList.push({ companyName, skill, jobType, status: 'Interview', notes });
            }
        }

        // Rejected
        if (event.target.classList.contains('rejected-btn')) {
            statusBtn.innerText = 'Rejected';
            updateStatusStyle(statusBtn, 'Rejected');
            interviewList = interviewList.filter(item => item.companyName !== companyName);
            if (!rejectedList.find(item => item.companyName === companyName)) {
                rejectedList.push({ companyName, skill, jobType, status: 'Rejected', notes });
            }
        }
    }

        calculateCount();
        checkNoJobs();
    //update filtered list when visible
         if (!filterSection.classList.contains('hidden')) {
            if (interviewFilterBtn.classList.contains('bg-blue-500')) renderList(interviewList);
            if (rejectedFilterBtn.classList.contains('bg-blue-500')) renderList(rejectedList);
        }

         
        //delete button
         if (event.target.classList.contains('delete-btn') || event.target.closest('.delete-btn')) {
        const deleteBtn = event.target.closest('.delete-btn');
        const parentNode = deleteBtn.closest('.shadow-md');
        parentNode.remove();

        const companyName = parentNode.querySelector('.companyName').innerText;
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        calculateCount();
        checkNoJobs();

 // Update filtered list if visible
        if (!filterSection.classList.contains('hidden')) {
            if (interviewFilterBtn.classList.contains('bg-blue-500')) renderList(interviewList);
            if (rejectedFilterBtn.classList.contains('bg-blue-500')) renderList(rejectedList); }
    
        }
        
});


// filter list

function renderList(list) {
    filterSection.innerHTML = '';

    for (let job of list) {
        let div = document.createElement('div');
        div.className = 'flex justify-between rounded-md shadow-md p-6';

        div.innerHTML = `
            <div class="card-1-child-1 space-y-6 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div>
                    <h2 class="companyName text-[#002C5C] font-semibold pb-2">${job.companyName}</h2>
                    <h2 class="skill text-[#64748B]">${job.skill}</h2>
                </div>
                <h3 class="jobType text-[#64748B]">${job.jobType}</h3>
                <button class="status px-3 py-2 rounded-sm">${job.status}</button>
                <p class="notes text-[#323B49]">${job.notes}</p>
                <div class="space-x-3">
                    <button class="interview-btn px-5 py-1 rounded-[8px] text-[#10B981] hover:bg-green-200 border border-[#10B981] font-medium">Interview</button>
                    <button class="rejected-btn px-5 py-1 rounded-[8px] text-[#EF4444] hover:bg-red-200 border border-[#EF4444] font-medium">Rejected</button>
                </div>
            </div>
            <div class="card-1-child-2">
                <button class="delete-btn"><img src="./image/Group 1.png" alt="delete"></button>
            </div>
        `;

        filterSection.appendChild(div);

        const statusBtn = div.querySelector('.status');
        updateStatusStyle(statusBtn, job.status);
    }

    calculateCount();
    checkNoJobs();
}


calculateCount();
checkNoJobs();