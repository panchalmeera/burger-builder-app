import React, { Component } from 'react';
import Auxx from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
	salad: 40,
	cheese: 100,
	meat: 90,
	bacon: 80
}
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			cheese: 0,
			meat: 0,
			salad: 0,
			bacon: 0
		},
		totalPrice: 170,
		purchasalble: false,
		purchasing: false
	}

	updatePurchaseState (ing) {
		const ingredients = {
			...ing
		};
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum,el) => {
				return sum + el;
			},0);
			this.setState({purchasalble: sum>0});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount>0){
			const newCount = oldCount - 1;
			const updatedIngredients = {
				...this.state.ingredients
			};
			updatedIngredients[type] = newCount;
			const priceDeduction = INGREDIENT_PRICES[type];
			const oldPrice = this.state.totalPrice;
			const newPrice = oldPrice - priceDeduction;
			this.setState({
				totalPrice: newPrice,
				ingredients: updatedIngredients
			});
			this.updatePurchaseState(updatedIngredients);
		}
		
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		alert("Please continue!")
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0
		}
		return (
			<Auxx>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary 
						ingredients={this.state.ingredients}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinue={this.purchaseContinueHandler}
						price={this.state.totalPrice}/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls 
					ingredientsRemoved = {this.removeIngredientHandler} 
					ingredientAdded = {this.addIngredientHandler}
					disabledInfo = {disabledInfo}
					price = {this.state.totalPrice}
					ordered = {this.purchaseHandler}
					purchasalble = {this.state.purchasalble}/>
			</Auxx>
		)
	}
}

export default BurgerBuilder;