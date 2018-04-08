import React, { Component } from 'react'

import GoalForm from '../GoalForm'
import Goal from './Goal'

class Resolutions extends Component {
	
	render(){
		const { resolutions } = this.props
		return (
			<ul>
			 {resolutions.map(({_id, name, completed, goals}) => (
	      <li key={_id}>
	        <span style={{
	          textDecoration: completed ? "line-through" : ""
	        }}>
	          {name}
	        </span>
	        <ul>
	          {goals.map(goal => (
	            <Goal goal={goal} key={goal._id} />
	          ))}
	        </ul>
	        <GoalForm resolutionId={_id} />
	      </li>  
	    ))}
    </ul>
		)	 
	}
}


export default Resolutions