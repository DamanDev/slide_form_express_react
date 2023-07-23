const List = ({personal}) => {
    return(
       <div className="list-content-wrapper">
            <div className="list-content">
                <h5 className="text-left">{(personal !== undefined && personal.name) ? personal.name: ""}</h5>
                <p className="text-left">{(personal !== undefined && personal.phone) ? personal.phone : ""}</p>
                <p className="text-left">{(personal !== undefined && personal.address) ? <small>{personal.address}</small> : ""}</p>
            </div>
        </div>
    )
}

export default List;