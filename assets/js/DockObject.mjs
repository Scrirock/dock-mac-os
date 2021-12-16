let flag = 0;
let curPos;
let iconSize;
let selected;

export const DockObject = {

    animateArrow: ()=>{
        let up = document.querySelector("#up");
        let left = document.querySelector("#left");
        let down = document.querySelector("#down");
        let right = document.querySelector("#right");

        up.addEventListener("mouseenter", (e)=>{
            e.target.style.transform = "translateY(-1rem)";
        });
        left.addEventListener("mouseenter", (e)=>{
            e.target.style.transform = "translateX(-1rem)";
        });
        down.addEventListener("mouseenter", (e)=>{
            e.target.style.transform = "translateY(1rem)";
        });
        right.addEventListener("mouseenter", (e)=>{
            e.target.style.transform = "translateX(1rem)";
        });
        up.addEventListener("mouseleave", (e)=>{
            e.target.style.transform = "translateY(0)";
        });
        left.addEventListener("mouseleave", (e)=>{
            e.target.style.transform = "translateX(0)";
        });
        down.addEventListener("mouseleave", (e)=>{
            e.target.style.transform = "translateY(0)";
        });
        right.addEventListener("mouseleave", (e)=>{
            e.target.style.transform = "translateX(0)";
        });
    },

    placeChanger: ()=>{
        let up = document.querySelector("#up");
        let left = document.querySelector("#left");
        let down = document.querySelector("#down");
        let right = document.querySelector("#right");
        let dockContainer = document.querySelector("#dockContainer");

        up.addEventListener("click", ()=>{
            document.body.style.alignItems = "flex-start";
            document.body.style.justifyContent = "center";
            dockContainer.style.flexFlow = "row nowrap";
            dockContainer.style.height = "10rem";
            flag = 0;
        });
        left.addEventListener("click", ()=>{
            document.body.style.alignItems = "center";
            document.body.style.justifyContent = "flex-start";
            dockContainer.style.flexFlow = "column nowrap";
            dockContainer.style.height = "100%";
            flag = 1;
        });
        down.addEventListener("click", ()=>{
            document.body.style.alignItems = "flex-end";
            document.body.style.justifyContent = "center";
            dockContainer.style.flexFlow = "row nowrap";
            dockContainer.style.height = "10rem";
            flag = 0;
        });
        right.addEventListener("click", ()=>{
            document.body.style.alignItems = "center";
            document.body.style.justifyContent = "flex-end";
            dockContainer.style.flexFlow = "column nowrap";
            dockContainer.style.height = "100%";
            flag = 1;
        });
    },

    searchLocalStorage: ()=>{
        for (let i = 0; i < localStorage.length; i++){
            let value = localStorage.getItem(i).split("!");
            DockObject.createDockElement(value[0], value[1], value[2]);
        }
    },

    addButton: (form, title, link, img)=>{
        if (title.value && link.value){
            let titleValue = title.value;
            let linkValue = link.value;
            let imgValue = "build/images/default.png";
            if (img.value) imgValue = img.value;

            DockObject.createDockElement(titleValue, linkValue, imgValue);

            let size = 0;
            if (localStorage.length) size = localStorage.length;
            localStorage.setItem(size, titleValue+"!"+linkValue+"!"+imgValue)

            form.remove();
        }
    },

    createForm: ()=>{
        const addButton = document.querySelector("#addButton");
        addButton.addEventListener("click", ()=>{
            let form = document.createElement("div");
            form.id = "formAdd";
            document.body.append(form);

            let title = document.createElement("input");
            title.type = "text";
            title.placeholder = "Titre: ";
            form.append(title);

            let link = document.createElement("input");
            link.type = "text";
            link.placeholder = "Lien du site: ";
            form.append(link);

            let img = document.createElement("input");
            img.type = "text";
            img.placeholder = "Lien de l'image (optionel): ";
            form.append(img);

            let button = document.createElement("div");
            button.id = "formButton";
            button.innerHTML = "Ajouter";
            form.append(button);

            button.addEventListener("click", ()=>{
                DockObject.addButton(form, title, link, img);
            })
        });
    },

    sizeChanger: ()=>{
        let dockContainer = document.querySelector("#dockContainer");

        dockContainer.addEventListener("mousemove", (e)=>{
            iconSize = document.querySelector(".dockElement").offsetWidth;
            if (flag) {
                curPos = e.clientY
                selected = (curPos/iconSize)+1;
            }
            else {
                curPos = e.clientX - dockContainer.offsetLeft;
                selected = (curPos/iconSize)-1;
            }
            let allElement = document.querySelectorAll(".dockElement");
            for (let i = 0; i < allElement.length; i++){
                allElement[i].style.transform = "scale(1)";
                allElement[i].style.margin = "0";
            }
            for (let i = -2; i < 3; i++){
                if (allElement[Math.trunc(selected)+i]){
                    allElement[Math.trunc(selected)+i].style.transform = `scale(${2-(Math.abs(i/4)+.25)})`;
                    allElement[Math.trunc(selected)+i].style.margin = `${1.75-Math.abs(i/1.7)}rem`;
                }
            }
        });

        dockContainer.addEventListener("mouseleave", ()=>{
            let allElement = document.querySelectorAll(".dockElement");
            for (let i = 0; i < allElement.length; i++){
                allElement[i].style.transform = "scale(1)";
                allElement[i].style.margin = "0";
            }
        });
    },

    createDockContainer: ()=>{
        let div = document.createElement("div");
        div.id = "dockContainer";
        document.body.append(div);

        let addElement = document.createElement("div");
        addElement.className = "dockElement";
        addElement.id = "addButton";
        addElement.style.backgroundImage = "url('build/images/add.png')";
        div.append(addElement);
    },

    createDockElement: (title, link, img)=>{
        const div = document.querySelector("#dockContainer");

        let dockElement = document.createElement("a");
        dockElement.className = "dockElement";
        dockElement.title = title;
        dockElement.href = link;
        dockElement.target = "_blank";
        dockElement.style.backgroundImage = "url('"+img+"')";
        div.insertBefore(dockElement, div.lastChild);
    }
}