export default function InsertBefore(Parent:HTMLElement, Child:HTMLElement){
    if(Parent && Child){
        if(Parent.firstChild){
            Parent.insertBefore(Child, Parent.firstChild)
        }else{
            Parent.appendChild(Child)
        }       
    }else{
        console.log("Parent or Child not found")
    }
}