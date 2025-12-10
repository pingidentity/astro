import { Key } from 'react';

interface Item {
  id: Key;
  email: string;
  firstName: string;
  lastName: string;
  status: 'Pending' | 'Active' | 'Failed' | 'Rejected';
}

export const items: Item[] = [
  {
    id: '1',
    email: 'dburkitt5@columbia.edu',
    firstName: 'Nicola',
    lastName: 'Burkitt',
    status: 'Failed',
  },
  {
    id: '2',
    email: 'idixie2@elegantthemes.com',
    firstName: 'Cacilia',
    lastName: 'Dixie',
    status: 'Active',
  },
  {
    id: '3',
    email: 'dfowler0@rambler.ru',
    firstName: 'Stavro',
    lastName: 'Fowler',
    status: 'Active',
  },
  {
    id: '4',
    email: 'jgolde8@jimdo.com',
    firstName: 'Celisse',
    lastName: 'Golde',
    status: 'Active',
  },
  {
    id: '5',
    email: 'shearst9@answers.com',
    firstName: 'Jeth',
    lastName: 'Hearst',
    status: 'Pending',
  },
  {
    id: '6',
    email: 'ajinaa@mapquest.com',
    firstName: 'Kaycee',
    lastName: 'Jina',
    status: 'Active',
  },
  {
    id: '7',
    email: 'vmalster4@biblegateway.com',
    firstName: 'Lorry',
    lastName: 'Malster',
    status: 'Pending',
  },
  {
    id: '8',
    email: 'yphipp6@yellowpages.com',
    firstName: 'Stanley',
    lastName: 'Phipp',
    status: 'Active',
  },
  {
    id: '9',
    email: 'mskilbeck3@bbc.co.uk',
    firstName: 'Gradey',
    lastName: 'Skilbeck',
    status: 'Pending',
  },
  {
    id: '10',
    email: 'dstebbing1@msu.edu',
    firstName: 'Marnia',
    lastName: 'Stebbing',
    status: 'Rejected',
  },
  {
    id: '11',
    email: 'lsterley7@lulu.com',
    firstName: 'Joshua',
    lastName: 'Sterley',
    status: 'Pending',
  },
  {
    id: '12',
    email: 'luttleyb@hugedomains.com',
    firstName: 'Jarrod',
    lastName: 'Uttley',
    status: 'Active',
  },
  {
    id: '13',
    email: 'lidelc@yelp.com',
    firstName: 'Andromache',
    lastName: 'Idel',
    status: 'Pending',
  },
];
