const Realm from 'realm';

const ReadSchema = {
  name: 'Read'
  properties: {
    url: 'string'
  }
}

const realm = new Realm({schema: [ReadSchema]})
export realm
