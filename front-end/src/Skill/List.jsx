import axoisInstace from "../Axois";
const List = ({skill, dltSkill}) => {
    let skillList;

    const deleteSkill = (id) => {
        const deleted_id = axoisInstace.axs.delete("/skill/dlt", {
          data : {skill_id : id}
        }, axoisInstace.config);
        dltSkill(id);
    }
    
    
      if(skill !== undefined && skill[0] !== undefined){
          skillList = skill.map(result => {
                    return <div key={result._id}>
                        <p  className="text-left skill-btn">{result.title + "  "} 
                            <i className="bi bi-x-circle" onClick={e=> deleteSkill(result._id)}></i>
                        </p>
                    </div>;
          })
      }else if(skill !== undefined && skill.length > 0){
          skillList = skill.map(result =>{  
              return <p >{result}</p>;
          })  
      }else{
        skillList = "";
      }
       
    


    return(
       <>
            
               
              {skillList}
             
       </>
    )
}

export default List;