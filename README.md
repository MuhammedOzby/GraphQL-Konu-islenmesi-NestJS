
# GraphQL dersleri NestJS varyasyonu

Eğitimlerin Ödev 2 kısmına kadar standart JS ile kodlanmıştır. Subscription dersindeki graphql-yoga kütüphanesinin eskimesi ve yapısını değiştirmesi sebebi ve NestJS üzerinde kendimi geliştirme isteğim ile bu yapıya geçiş yapmış bulunmaktayım.

Çalışmalar aynı şekilde takip edilmektedir ama yapılan işler **NestJS** üzerinde yapılacaktır.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
***

# Ödev 1

Kullanıcılar, etkinlikler, etkinliklerin yapılacağı konum ve etkinlik katılımcılarını size sağlanan veri seti üzerinden görüntüleyebilecek bir GraphQL sunucu oluşturmanız gerekiyor.

## Gereksinimler

- [Şuradaki](https://github.com/Kodluyoruz/taskforce/blob/main/graphql/odev-01/data.json) veri seti kullanılarak bir GraphQL sunucusu ayağa kaldırılmalıdır.
- Temel olarak `User`, `Event`, `Location` ve `Participant` tiplerini oluşturmalısınız. Bu tiplerle alakalı fieldları veri seti üzerinden görüntüleyebilirsiniz.
- Bir `User`'a ait bir veya birden fazla `Event` olabilir.
- Bir `Event`, bir `User` ile ilişkili olmalıdır.
- Bir `Event`, bir `Location` ile ilişkili olmalıdır.
- Bir `Event` birden fazla `Participant` ile ilişkili olmalıdır.
- Tüm tipler üzerinde tümünü listeleme ve id bazlı bir kaydı getirme Query'leri yazılmalıdır.

Günün sonunda aşağıdaki Query'ler çalışır vaziyette olmalıdır.

```graphQL
query users{}
query user(id: 1){}

query events{}
query event(id: 1){}
query events{
  id
  title
  user{
    id
    username
  }
  pariticipants{
    id
    username
  }
  location{
    id
    name
  }
}

query locations{}
query location(id: 1){}

query participants{}
query participant(id: 1){}
```

***

## Yapılan testler

Yukarıda belirtilen queryler şu şekilde çalıştırılmıştır:

```graphQL
query getAllUsers {
  Users {
    id
    username
    email
    events {
      title
      desc
    }
  }
}

query getUser {
  User(id: "1") {
    id
    username
    email
    events {
      title
      desc
    }
  }
}

query getAllEvents {
  Events {
    id
    title
    desc
    date
    from
    to
    location_id
    user_id
    user {
      id
      username
      email
      events {
        title
        desc
      }
    }
    location {
      id
      name
      desc
      lat
      lng
    }
    participants {
      id
      user {
        username
      }
    }
  }
}

query getEvent {
  Event(id: "1") {
    id
    title
    desc
    date
    from
    to
    location_id
    user_id
    user {
      id
      username
      email
      events {
        title
        desc
      }
    }
    location {
      id
      name
      desc
      lat
      lng
    }
    participants {
      id
      user {
        username
      }
    }
  }
}

query getAllLocations {
  Locations {
    name
    desc
  }
}
query getLocation {
  Location(id: "1") {
    name
    desc
  }
}

query getAllParticipants {
  Participants {
    id
    user {
      username
    }
    event {
      title
    }
  }
}
query getParticipant {
  Participant(id: "1") {
    id
    user {
      username
    }
    event {
      title
    }
  }
}

```

***

# Ödev 2

Bu ödevde göreviniz, tüm tiplerle alakalı oluşturma, güncelleme, silme ve tümünü silme Mutation'larını hazırlamak olacak.

## Gereksinimler

- Yeni bir `User` ekleyecek Mutation yazılmalıdır.
- Bir `User`'ı güncelleyecek olan Mutation yazılmalıdır.
- Bir `User`'ı silecek olan Mutation yazılmalıdır.
- Tüm `User`'ları silecek olan Mutation yazılmalıdır.
- Yukarıdaki maddeler `Event`, `Location` ve `Participant` için de uygulanmalıdır.

Günün sonunda aşağıdaki Mutation'lar çalışır vaziyette olmalıdır.

```graphQL
  mutation addUser
  mutation updateUser
  mutation deleteUser
  mutation deleteAllUsers

  mutation addEvent
  mutation updateEvent
  mutation deleteEvent
  mutation deleteAllEvents

  mutation addLocation
  mutation updateLocation
  mutation deleteLocation
  mutation deleteAllLocations

  mutation addParticipant
  mutation updateParticipant
  mutation deleteParticipant
  mutation deleteAllParticipants
```

***

## Yapılan testler

### User üzerindeki Mutation testleri

```graphQL
mutation addUser {
  addUser(data: { username: "asdasd", email: "fsdljhgsdfg" }) {
    id
  }
}

mutation updateUser {
  updateUser(data: { id: "7", email: "fsdljhgsdfg" }) {
    id
    username
    email
  }
}

mutation deleteUser {
  deleteUser(id: "7")  {
    id
    username
    email
  }
}

mutation deleteAllUsers {
  deleteAllUsers(interact: "i agree")
}
```

### Event üzerindeki Mutation testleri

```graphQL
mutation addEvent {
  addEvent(data: { title:"dskjfhksfjhg" }) {
    id
  }
}

mutation updateEvent {
  updateEvent(data: { id: "3", title:"asdasdasdsasa"}) {
    id
    title
  }
}

mutation deleteEvent {
  deleteEvent(id: "7")  {
    id
  }
}

mutation deleteAllEvents {
  deleteAllEvents(interact: "i agree")
}
```

### Location üzerindeki Mutation testleri

```graphQL
mutation addLocation {
  addLocation(data: { name:"dskjfhksfjhg" }) {
    id
  }
}

mutation updateLocation {
  updateLocation(data: { id: "293bf89e-7193-4aa6-8177-3f2990e1e060", name:"asdasdasdsasa"}) {
    id
    name
  }
}

mutation deleteLocation {
  deleteLocation(id: "293bf89e-7193-4aa6-8177-3f2990e1e060")  {
    id
  }
}

mutation deleteAllLocations {
  deleteAllLocations(interact: "i agree")
}
```

### Participant üzerindeki Mutation testleri

```graphQL
mutation addParticipant {
  addParticipant(data: { user_id:"3",event_id:"3" }) {
    id
  }
}

mutation updateParticipant {
  updateParticipant(data: { id: "11d44372-5d6d-4860-a99d-ad408468d4b4", user_id:"asdasdasdsasa"}) {
    id
    user_id
  }
}

mutation deleteParticipant {
  deleteParticipant(id: "11d44372-5d6d-4860-a99d-ad408468d4b4")  {
    id
    user_id
  }
}

mutation deleteAllParticipants {
  deleteAllParticipants(interact: "i agree")
}
```

***

# Ödev 3

Bu ödevde göreviniz bir Subscription yapısı kurgulamak olacak.

## Gereksinimler

Yeni bir `User`, `Event` veya bir Event'e `Participant` eklendiğinde bu veriyi Subscription üzerinden iletmeniz gerekiyor.

Günün sonunda aşağıdaki Mutation'lar çalışır vaziyette olmalıdır.

```graphQL
  subscription userCreated
  subscription eventCreated
  subscription participantAdded
```

***

# Yapılan Testler

## Subscriptions

```graphQL
subscription userCreated {
  userCreated {
    username
  }
}

subscription eventCreated {
  eventCreated {
    title
  }
}

subscription participantAdded {
  participantAdded {
    event {
      title
    }
    user {
      username
    }
  }
}
```

## Mutations

```graphQL
mutation addEvent {
  addEvent(data: { title: "dasfjksaklgf" }) {
    id
    title
  }
}

mutation addUser {
  addUser(data: { username: "skjdhfkjsdfjg", email: "lsfdhglkdfg" }){username}
}

mutation addParticipant{addParticipant(data:{user_id:1, event_id: 1}){
  event{title}
  user{username}
}}
```
