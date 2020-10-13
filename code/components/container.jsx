const style = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
}

const ContainerComp = ({children, comp: Comp}) => {
    return (
        <Comp style={style}>{children}</Comp>
    ) 
}

export default ContainerComp