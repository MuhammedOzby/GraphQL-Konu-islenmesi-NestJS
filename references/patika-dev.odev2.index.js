const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const { v4: uuidV4 } = require('uuid');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const users = data.users;
const events = data.events;
const locations = data.locations;
const participants = data.participants;

const typeDefs = gql`
  # ------------------- Types for User Start -------------------
  # User
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event]
  }
  # User input for mutation
  input addUserInput {
    username: String!
    email: String!
  }
  input updateUserInput {
    id: String!
    username: String
    email: String
  }
  # ------------------- Types for User End -------------------
  # ------------------- Types for Event Start -------------------
  type Event {
    id: ID!
    title: String!
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
    user: User
    location: Location
    participants: [Participant]
  }
  input addEventInput {
    title: String!
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }
  input updateEventInput {
    id: ID!
    title: String!
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }
  # ------------------- Types for User End -------------------
  # ------------------- Types for Location Start -------------------
  type Location {
    id: ID!
    name: String
    desc: String
    lat: Float
    lng: Float
  }
  input addLocationInput {
    name: String!
    desc: String
    lat: Float
    lng: Float
  }
  input updateLocationInput {
    id: ID!
    name: String
    desc: String
    lat: Float
    lng: Float
  }
  # ------------------- Types for Location End -------------------
  # ------------------- Types for Participant Start -------------------
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!
  }
  input addParticipantInput {
    user_id: ID!
    event_id: ID!
  }
  input updateParticipantInput {
    id: ID!
    user_id: ID
    event_id: ID
  }
  # ------------------- Types for Participant End -------------------
  # ------------------- Query Start -------------------
  type Query {
    User(id: ID!): User
    Users: [User]
    Event(id: ID!): Event
    Events: [Event]
    Location(id: ID!): Location
    Locations: [Location]
    Participant(id: ID!): Participant
    Participants: [Participant]
  }
  # ------------------- Query End -------------------
  # ------------------- Mutation Start -------------------
  type Mutation {
    # ------------------- Mutation for User Start -------------------
    addUser(data: addUserInput!): User!
    updateUser(data: updateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers(interact: String!): Boolean!
    # ------------------- Mutation for User End -------------------
    # ------------------- Mutation for Event Start -------------------
    addEvent(data: addEventInput!): Event!
    updateEvent(data: updateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents(interact: String!): Boolean!
    # ------------------- Mutation for Event End -------------------
    # ------------------- Mutation for Location Start -------------------
    addLocation(data: addLocationInput!): Location!
    updateLocation(data: updateLocationInput!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocations(interact: String!): Boolean!
    # ------------------- Mutation for Location End -------------------
    # ------------------- Mutation for Participant Start -------------------
    addParticipant(data: addParticipantInput!): Participant!
    updateParticipant(data: updateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipants(interact: String!): Boolean!
    # ------------------- Mutation for Participant End -------------------
  }
  # ------------------- Mutation End -------------------
`;

const resolvers = {
  Query: {
    User: (parent, args) => users.find((user) => user.id == args.id),
    Users: () => users,
    Event: (parent, args) => events.find((event) => event.id == args.id),
    Events: () => events,
    Location: (parent, args) =>
      locations.find((location) => location.id == args.id),
    Locations: () => locations,
    Participant: (parent, args) =>
      participants.find((participant) => participant.id == args.id),
    Participants: () => participants,
  },
  Mutation: {
    // * ------------------- Mutation for User Start -------------------
    addUser: (parent, { data: { username, email } }) => {
      const user = {
        id: uuidV4(),
        username,
        email,
        events: [],
      };
      users.push(user);
      return user;
    },
    updateUser: (parent, { data }) => {
      const userIndex = users.findIndex((element) => {
        return element.id == data.id;
      });
      if (userIndex == -1) {
        throw new Error('User not defined!');
      }
      users[userIndex] = {
        ...users[userIndex],
        ...data,
      };
      return users[userIndex];
    },
    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex((element) => {
        return element.id == id;
      });
      if (userIndex == -1) {
        throw new Error('User not defined!');
      }
      const userData = users[userIndex];
      users.splice(userIndex, 1);
      return userData;
    },
    deleteAllUsers: (parent, { interact }) => {
      if (interact == 'i agree') {
        users.splice(0, users.length);
        return true;
      } else
        throw new Error(
          "You not agree all user delete! Please enter: 'i agree'.",
        );
    },
    // ! ------------------- Mutation for User End -------------------
    // * ------------------- Mutation for Event Start -------------------
    addEvent: (
      parent,
      { data: { title, desc, date, from, to, location_id, user_id } },
    ) => {
      const event = {
        id: uuidV4(),
        title,
        desc,
        date,
        from,
        to,
        location_id,
        user_id,
      };
      events.push(event);
      return event;
    },
    updateEvent: (parent, { data }) => {
      const eventIndex = events.findIndex((element) => {
        return element.id == data.id;
      });
      if (eventIndex == -1) {
        throw new Error('Event not defined!');
      }
      events[eventIndex] = {
        ...events[eventIndex],
        ...data,
      };

      return events[eventIndex];
    },
    deleteEvent: (parent, { id }) => {
      const eventIndex = events.findIndex((element) => {
        return element.id == id;
      });
      if (eventIndex == -1) {
        throw new Error('Event not defined!');
      }
      const eventData = events[eventIndex];
      events.splice(eventIndex, 1);
      return eventData;
    },
    deleteAllEvents: (parent, { interact }) => {
      if (interact == 'i agree') {
        events.splice(0, events.length);
        return true;
      } else
        throw new Error(
          "You not agree all event delete! Please enter: 'i agree'.",
        );
    },
    // ! ------------------- Mutation for Event End -------------------
    // * ------------------- Mutation for Location Start -------------------
    addLocation: (parent, { data: { name, desc, lat, lng } }) => {
      const location = {
        id: uuidV4(),
        name,
        desc,
        lat,
        lng,
      };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { data }) => {
      const locationIndex = locations.findIndex((element) => {
        return element.id == data.id;
      });
      if (locationIndex == -1) {
        throw new Error('Location not defined!');
      }
      locations[locationIndex] = {
        ...locations[locationIndex],
        ...data,
      };

      return locations[locationIndex];
    },
    deleteLocation: (parent, { id }) => {
      const locationIndex = locations.findIndex((element) => {
        return element.id == id;
      });
      if (locationIndex == -1) {
        throw new Error('Location not defined!');
      }
      const locationData = locations[locationIndex];
      locations.splice(locationIndex, 1);
      return locationData;
    },
    deleteAllLocations: (parent, { interact }) => {
      if (interact == 'i agree') {
        locations.splice(0, locations.length);
        return true;
      } else
        throw new Error(
          "You not agree all location delete! Please enter: 'i agree'.",
        );
    },
    // ! ------------------- Mutation for Location End -------------------
    // * ------------------- Mutation for Participant Start -------------------
    addParticipant: (parent, { data: { user_id, event_id } }) => {
      const participant = {
        id: uuidV4(),
        user_id,
        event_id,
      };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, { data }) => {
      const participantIndex = participants.findIndex((element) => {
        return element.id == data.id;
      });
      if (participantIndex == -1) {
        throw new Error('Participant not defined!');
      }
      participants[participantIndex] = {
        ...participants[participantIndex],
        ...data,
      };

      return participants[participantIndex];
    },
    deleteParticipant: (parent, { id }) => {
      const participantIndex = participants.findIndex((element) => {
        return element.id == id;
      });
      if (participantIndex == -1) {
        throw new Error('Participant not defined!');
      }
      const participantData = participants[participantIndex];
      participants.splice(participantIndex, 1);
      return participantData;
    },
    deleteAllParticipants: (parent, { interact }) => {
      if (interact == 'i agree') {
        participants.splice(0, participants.length);
        return true;
      } else
        throw new Error(
          "You not agree all participant delete! Please enter: 'i agree'.",
        );
    },
    // ! ------------------- Mutation for Participant End -------------------
  },
  User: {
    events: (parent) => events.filter((event) => event.user_id == parent.id),
  },
  Event: {
    user: (parent) => users.find((user) => user.id == parent.user_id),
    location: (parent) =>
      locations.find((location) => location.id == parent.location_id),
    participants: (parent) =>
      participants.filter((participant) => participant.event_id == parent.id),
  },
  Participant: {
    user: (parent) => users.find((user) => user.id == parent.user_id),
    event: (parent) => events.find((event) => event.id == parent.event_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`Apollo is flying 🚀 URL:${url}`);
});
