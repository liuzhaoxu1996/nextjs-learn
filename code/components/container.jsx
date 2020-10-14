import { cloneElement } from 'react' 
const style = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0 20px',
}

const ContainerComp = ({children, renderer = <div />}) => {
    return cloneElement(renderer, {
        style: Object.assign({}, style, renderer.props.style), 
        children
    })
}

export default ContainerComp