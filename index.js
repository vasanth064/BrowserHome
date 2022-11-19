const container = document.querySelector('.container');
const button = document.querySelector('#button');
const searchProviderImage = document.querySelector('#searchProviderImage'); 
const searchProviderLink = document.querySelector('#searchProviderForm');

navigator.serviceWorker.register('./sw.js');
const select = document.querySelector('select');
searchProvider.forEach((provider)=>{
    const newOption = document.createElement('option');
    const optionText = document.createTextNode(provider.title);
    newOption.appendChild(optionText);
    newOption.setAttribute("value",provider.title);
    select.appendChild(newOption);
});


function changeSearchProvider(){
    const searchProviderName = select.value;
    const provider = searchProvider.filter((provider)=> provider.title == searchProviderName);
    console.log(provider);
    localStorage.setItem('index',provider[0].index);
    localStorage.setItem('title',provider[0].title);
    localStorage.setItem('link',provider[0].link);
    localStorage.setItem('image',provider[0].image);
    searchProviderImage.setAttribute('src',localStorage.getItem('image'))
    searchProviderLink.setAttribute('action',localStorage.getItem('link'))
}


data.forEach((row) => {
  const containerRow = document.createElement('div');
  containerRow.classList.add('containerRow');
  container.appendChild(containerRow);

  row.forEach((item) => {
    if (!Array.isArray(item)) {
      containerRow.innerHTML += `
      <a href="${item.link}" class="buttonLink">
        <div class="buttonContainer">
          <img class="buttonIcon" src="${item.icon}" />
          ${item.title ? `<p class='buttonTitle'>${item.title}</p>` : ''}
        </div>
      </a>
      `;
    } else {
      const containerGroup = document.createElement('div');
      containerGroup.classList.add('containerGroup');
      containerRow.appendChild(containerGroup);
      item.forEach((item) => {
        containerGroup.innerHTML += `
        <a href="${item.link}" class="buttonLink">
          <div class="buttonContainer">
            <img class="buttonIcon" src="${item.icon}" />
          </div>
        </a>
      `;
      });
    }
  });
});
searchProviderImage.setAttribute('src',localStorage.getItem('image'))
searchProviderLink.setAttribute('action',localStorage.getItem('link'))
document.querySelector("select").selectedIndex = parseInt(localStorage.getItem('index'))
