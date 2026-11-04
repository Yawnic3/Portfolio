const moreWork=document.getElementById('more-work-disclosure');
function revealProject(){if(['#noteshare','#chompchange'].includes(location.hash))moreWork.open=true;}
addEventListener('hashchange',revealProject);revealProject();
