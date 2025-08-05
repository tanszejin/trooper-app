## Collaborative Trip-Planning Platform ##

### Functional Specification ###
The web app will be a platform that allows users to plan their trips collaboratively, providing a seamless way to organize upcoming trips. The web app allows users to create new trips and add other users that are involved. In the trip, there will be a collaborative itinerary maker, which allows users to add events into the itinerary according to date and time. Each event will include its name, the people involved, a google maps link to its location, any pdfs of tickets, any additional notes etc. The platform also provides a chat function for users that are part of the trip to discuss their plans. Open-ended polls can also be made for users to vote on any attractions or sites they want to visit. Users can also create to-do lists to input any bookings that have to be made, as well as who is responsible for it. Users can also add optional information to trips, such as reminders on things to bring, the address for the accomodations, transport information etc. The platform will also show a dashboard of upcoming trips and tasks in any to-do lists that are assigned to the user. If time permits, an expense tracker can also be included. All functionalities will be updated in real-time.

Possible additional functions if time permits: 
- allow sharing of itineraries: users can make their itinerary public and others can import them into their own trip

### Technical Specification ###

Client Framework:    
React for rendering and routing, React Context for local state.

Server Framework / Backend Setup:    
Firebase (Firestore for persistent data storage + Auth for handling user accounts and session management + Cloud Functions). Firebase also allows for real-time syncing. 

