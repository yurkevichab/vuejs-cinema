export const checkFilter=(category, title, checked)=>{
    if(checked){
        this[category].push(title);
    }else{
        let index = this[category].indexOf(title);
        if(index>-1){
            this[category].splice(index,1)
        }
    }
}