import React, { Component } from "react";
import FriendCard from "./components/CharacterCard/FriendCard";
import Wrapper from "./components/Wrapper/wrapper";
import Title from "./components/Title/title";
import friends from "./friends.json";
import Navbar from "./components/Navbar/Navbar"

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    topScore: 0,
    clicked: []
  };

  componentDidMount() {
    this.startGame()
  }

  startGame() {
    this.setState({
    friends,
    score: 0,
    topScore: 0,
    clicked: []
    })
   
  }
//component to reset the game 
  resetGame = () => {
    this.setState({
      friends,
      score: 0,
      clicked: []
      })
      if (this.state.score > this.state.topScore) {
        this.setState({topScore: this.state.score}, function() {
        });
      }
      this.state.friends.forEach(friend => {
        friend.count = 0;
      });
  }
    
    // clickCounter increases this.state.score by 1, 
    clickCounter = (id) => {
      if (this.state.clicked.includes(id)) {
        alert(`When you play the game of clicky, you win or you lose...and you lose... \nscore: ${this.state.score}`);
        this.setState({score: 0});
        //^ if user clicks the same image twice, then alert "you lose" and restart game
      this.resetGame()
      } else if(this.state.score === 11){
        alert ("When you play the game of clicky, you win or die...and you WON!");
        this.startGame();
      } else {
        //else keep playing the game
        let currentClicked = this.state.clicked;
        currentClicked.push(id);
        this.setState({
          clicked: currentClicked,
          score: this.state.score + 1
        });
        this.state.friends.sort(() => Math.random() - 0.5)
          return true; 
        } 
    };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>GAME OF CLICKY!</Title>
        <Navbar score={this.state.score} topScore={this.state.topScore}> Clicky Game </Navbar>
        {this.state.friends.map(friend => (
          <FriendCard
            clickCounter={this.clickCounter}
            id={friend.id}
            key={friend.id}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;