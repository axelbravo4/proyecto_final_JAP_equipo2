let toggle=document.getElementById('toggle');
toggle.addEventListener('change', (event)=>{
    let checked=event.target.checked;
    document.body.classList.toggle('dark');
})