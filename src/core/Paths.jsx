


export default {
    home:()=>"/",
    signin:()=>"/signin",
    signup:()=>"/signup",
    task:{
        createRoute:(id)=> `/task/${id}`,
        route:()=>`/task/:id`
    }
}