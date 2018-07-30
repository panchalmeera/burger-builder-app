import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
	{ label: 'Salad', type: 'salad'},
	{ label: 'Bacon', type: 'bacon'},
	{ label: 'Cheese', type: 'cheese'},
	{ label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		Total Price <strong>{props.price}</strong>
		{controls.map(ctrl => (
			<BuildControl 
				added={() => props.ingredientAdded(ctrl.type)} 
				removed={() => props.ingredientsRemoved(ctrl.type)}
				key={ctrl.label} 
				label={ctrl.label} 
				disabledInfo = {props.disabledInfo[ctrl.type]}/>
		))}
		<button 
			disabled={!props.purchasalble}
			className={classes.OrderButton}
			onClick={props.ordered}>ORDER NOW</button>
	</div>
);

export default buildControls;