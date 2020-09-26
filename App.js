class App extends Component {
  constructor() {
   super()
   this.state = {
   items: [],
   currentItem: {text:'', key:''},
   }
   }
  addItem = () => {
   console.log('Hello Add Item')
   }
  render() {
   return (
   <div className="App">
   <TodoList addItem={this.addItem} />
   </div>
   )
   }
  }