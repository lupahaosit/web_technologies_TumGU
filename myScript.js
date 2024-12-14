
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        id: '1',
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                id: '1.1',
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        id: '1.1.1',
                        items: [
                            {
                                name: 'SMTH',
                                hasChildren: false,
                                id: '1.1.1.1',
                                items: []
                            },
                            {
                                name: 'SMTH',
                                hasChildren: false,
                                id: '1.1.1.2',
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        id: '1.1.2',
                        items: []
                    },
                    {
                        name: 'Handmade',
                        hasChildren: true,
                        id: '1.1.3',
                        items: [
                            {
                                name: 'SMTH',
                                hasChildren: false,
                                id: '1.1.3.1',
                                items: []
                            },
                            {
                                name: 'SMTH',
                                hasChildren: false,
                                id: '1.1.3.2',
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Glass',
                        hasChildren: false,
                        id: '1.1.4',
                        items: []
                    }
                ]
            },
            {
                name: 'Фильтры',
                hasChildren: true,
                id: '1.2',
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        id: '1.2.1',
                        items: [
                            {
                                name: 'SMTH',
                                hasChildren: false,
                                id: '1.2.1.1',
                                items: []
                            },
                            {
                                name: 'SMTH',
                                hasChildren: false,
                                id: '1.2.1.2',
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        id: '1.2.2',
                        items: []
                    }
                ]
            }
        ]
   
    }
    parent = data
    childDiv = childDiv = document.createElement('div')

    childDiv.innerHTML = parent.name
    childDiv.id = parent.id
    childDiv.innerHTML = '<div class = "d-flex align-items-center"><img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>'+
    '<img class="list-item__folder" src="img/folder.png" alt="folder">'+
    '<span>' + parent.name + '</span></div>'
    document.body.appendChild(childDiv)
    renderChild(parent.items)
    function renderChild(items){
        items.forEach(element => {
            id = element.id.slice(0, -2)
            parent = document.getElementById(id)
            var createdDiv = document.createElement('div')
            createdDiv.innerHTML = '<div class = "d-flex align-items-center"><img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>'+
                    '<img class="list-item__folder" src="img/folder.png" alt="folder">'+
                    '<span>' + element.name + '</span></div>'
            createdDiv.id = element.id
            createdDiv.classList = 'my-list-item d-none'
            parent.appendChild(createdDiv)
            if(element.hasChildren){
                renderChild(element.items)
            }
            else{
                
            }

        });
    }

   
}

document.addEventListener('click', function(e) {
    if(e.target.classList.value === 'list-item__arrow'){
        parent_id = e.target.parentElement.parentElement.id
        child = ''
        counter = 1
        while(child != null ){
            var child = document.getElementById(parent_id + '.' + counter)
            if(child != undefined && child != null){
                if(child.classList.contains('d-none')){
                    child.classList.remove('d-none')
                }
                else{
                    child.classList.add('d-none')
                }
            }
            counter++
        }

    }
})