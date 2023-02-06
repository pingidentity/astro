import React from 'react';
import { Item } from '@react-stately/collections';
import CreateIcon from 'mdi-react/CreateIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import FormSelectIcon from 'mdi-react/FormSelectIcon';
import { useAsyncList } from '@react-stately/data';
import { action } from '@storybook/addon-actions';
import isChromatic from 'chromatic/isChromatic';
import ListView from '.';
import Box from '../Box/Box';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Text from '../Text';
import loadingStates from '../../utils/devUtils/constants/loadingStates';

export default {
  title: 'Components/ListView',
  component: ListView,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    loadingState: {
      control: {
        type: 'select',
        options: loadingStates,
      },
    },
    disabledKeys: {
      defaultValue: ['Snake'],
    },
    items: {
      control: {
        type: 'none',
      },
    },
    onSelectionChange: {
      control: 'none',
      // eslint-disable-next-line no-console
      defaultValue: console.log,
    },
  },
};

const items = [
  { key: 'Aardvark', name: 'Aardvark', id: '1', hasSeparator: false },
  { key: 'Kangaroo', name: 'Kangaroo', id: '2' },
  { key: 'Snake', name: 'Snake', id: '3' },
];

const animals = [
  { name: 'Aardvark' },
  { name: 'Albatross' },
  { name: 'Alligator' },
  { name: 'Alpaca' },
  { name: 'Ant' },
  { name: 'Anteater' },
  { name: 'Antelope' },
  { name: 'Ape' },
  { name: 'Armadillo' },
  { name: 'Donkey' },
  { name: 'Baboon' },
  { name: 'Badger' },
  { name: 'Barracuda' },
  { name: 'Bat' },
  { name: 'Bear' },
  { name: 'Beaver' },
  { name: 'Bee' },
  { name: 'Bison' },
  { name: 'Boar' },
  { name: 'Buffalo' },
  { name: 'Butterfly' },
  { name: 'Camel' },
  { name: 'Capybara' },
  { name: 'Caribou' },
  { name: 'Cassowary' },
  { name: 'Cat' },
  { name: 'Caterpillar' },
  { name: 'Cattle' },
  { name: 'Chamois' },
  { name: 'Cheetah' },
  { name: 'Chicken' },
  { name: 'Chimpanzee' },
  { name: 'Chinchilla' },
  { name: 'Chough' },
  { name: 'Clam' },
  { name: 'Cobra' },
  { name: 'Cockroach' },
  { name: 'Cod' },
  { name: 'Cormorant' },
  { name: 'Coyote' },
  { name: 'Crab' },
  { name: 'Crane' },
  { name: 'Crocodile' },
  { name: 'Crow' },
  { name: 'Curlew' },
  { name: 'Deer' },
  { name: 'Dinosaur' },
  { name: 'Dog' },
  { name: 'Dogfish' },
  { name: 'Dolphin' },
  { name: 'Dotterel' },
  { name: 'Dove' },
  { name: 'Dragonfly' },
  { name: 'Duck' },
  { name: 'Dugong' },
  { name: 'Dunlin' },
  { name: 'Eagle' },
  { name: 'Echidna' },
  { name: 'Eel' },
  { name: 'Eland' },
  { name: 'Elephant' },
  { name: 'Elk' },
  { name: 'Emu' },
  { name: 'Falcon' },
  { name: 'Ferret' },
  { name: 'Finch' },
  { name: 'Fish' },
  { name: 'Flamingo' },
  { name: 'Fly' },
  { name: 'Fox' },
  { name: 'Frog' },
  { name: 'Gaur' },
  { name: 'Gazelle' },
  { name: 'Gerbil' },
  { name: 'Giraffe' },
  { name: 'Gnat' },
  { name: 'Gnu' },
  { name: 'Goat' },
  { name: 'Goldfinch' },
  { name: 'Goldfish' },
  { name: 'Goose' },
  { name: 'Gorilla' },
  { name: 'Goshawk' },
  { name: 'Grasshopper' },
  { name: 'Grouse' },
  { name: 'Guanaco' },
  { name: 'Gull' },
  { name: 'Hamster' },
  { name: 'Hare' },
  { name: 'Hawk' },
  { name: 'Hedgehog' },
  { name: 'Heron' },
  { name: 'Herring' },
  { name: 'Hippopotamus' },
  { name: 'Hornet' },
  { name: 'Horse' },
  { name: 'Human' },
  { name: 'Hummingbird' },
  { name: 'Hyena' },
  { name: 'Ibex' },
  { name: 'Ibis' },
  { name: 'Jackal' },
  { name: 'Jaguar' },
  { name: 'Jay' },
  { name: 'Jellyfish' },
  { name: 'Kangaroo' },
  { name: 'Kingfisher' },
  { name: 'Koala' },
  { name: 'Kookabura' },
  { name: 'Kouprey' },
  { name: 'Kudu' },
  { name: 'Lapwing' },
  { name: 'Lark' },
  { name: 'Lemur' },
  { name: 'Leopard' },
  { name: 'Lion' },
  { name: 'Llama' },
  { name: 'Lobster' },
  { name: 'Locust' },
  { name: 'Loris' },
  { name: 'Louse' },
  { name: 'Lyrebird' },
  { name: 'Magpie' },
  { name: 'Mallard' },
  { name: 'Manatee' },
  { name: 'Mandrill' },
  { name: 'Mantis' },
  { name: 'Marten' },
  { name: 'Meerkat' },
  { name: 'Mink' },
  { name: 'Mole' },
  { name: 'Mongoose' },
  { name: 'Monkey' },
  { name: 'Moose' },
  { name: 'Mosquito' },
  { name: 'Mouse' },
  { name: 'Mule' },
  { name: 'Narwhal' },
  { name: 'Newt' },
  { name: 'Nightingale' },
  { name: 'Octopus' },
  { name: 'Okapi' },
  { name: 'Opossum' },
  { name: 'Oryx' },
  { name: 'Ostrich' },
  { name: 'Otter' },
  { name: 'Owl' },
  { name: 'Oyster' },
  { name: 'Panther' },
  { name: 'Parrot' },
  { name: 'Partridge' },
  { name: 'Peafowl' },
  { name: 'Pelican' },
  { name: 'Penguin' },
  { name: 'Pheasant' },
  { name: 'Pig' },
  { name: 'Pigeon' },
  { name: 'Pony' },
  { name: 'Porcupine' },
  { name: 'Porpoise' },
  { name: 'Quail' },
  { name: 'Quelea' },
  { name: 'Quetzal' },
  { name: 'Rabbit' },
  { name: 'Raccoon' },
  { name: 'Rail' },
  { name: 'Ram' },
  { name: 'Rat' },
  { name: 'Raven' },
  { name: 'Red deer' },
  { name: 'Red panda' },
  { name: 'Reindeer' },
  { name: 'Rhinoceros' },
  { name: 'Rook' },
  { name: 'Salamander' },
  { name: 'Salmon' },
  { name: 'Sand Dollar' },
  { name: 'Sandpiper' },
  { name: 'Sardine' },
  { name: 'Scorpion' },
  { name: 'Seahorse' },
  { name: 'Seal' },
  { name: 'Shark' },
  { name: 'Sheep' },
  { name: 'Shrew' },
  { name: 'Skunk' },
  { name: 'Snail' },
  { name: 'Snake' },
  { name: 'Sparrow' },
  { name: 'Spider' },
  { name: 'Spoonbill' },
  { name: 'Squid' },
  { name: 'Squirrel' },
  { name: 'Starling' },
  { name: 'Stingray' },
  { name: 'Stinkbug' },
  { name: 'Stork' },
  { name: 'Swallow' },
  { name: 'Swan' },
  { name: 'Tapir' },
  { name: 'Tarsier' },
  { name: 'Termite' },
  { name: 'Tiger' },
  { name: 'Toad' },
  { name: 'Trout' },
  { name: 'Turkey' },
  { name: 'Turtle' },
  { name: 'Viper' },
  { name: 'Vulture' },
  { name: 'Wallaby' },
  { name: 'Walrus' },
  { name: 'Wasp' },
  { name: 'Weasel' },
  { name: 'Whale' },
  { name: 'Wildcat' },
  { name: 'Wolf' },
  { name: 'Wolverine' },
  { name: 'Wombat' },
  { name: 'Woodcock' },
  { name: 'Woodpecker' },
  { name: 'Worm' },
  { name: 'Wren' },
  { name: 'Yak' },
  { name: 'Zebra' },
];

const props = {
  disabledKeys: ['Snake'],
};

const actions = {
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
  onLoadMore: action('onLoadMore'),
};

const ListElement = ({ item }) => (
  <Box isRow >
    <Box isRow mr="auto" alignSelf="center" >
      <Icon icon={FormSelectIcon} mr="sm" color="accent.40" size="md" />
      <Text variant="itemTitle" alignSelf="center">{item.name}</Text>
    </Box>
    <Box isRow alignSelf="center" gap="sm" >
      <IconButton aria-label="create-icon" >
        <Icon icon={CreateIcon} size="sm" />
      </IconButton>
      <IconButton aria-label="actions-icon" >
        <Icon icon={MoreVertIcon} size="sm" />
      </IconButton>
    </Box>
  </Box>
);

export const Default = ({ ...args }) => (
  <ListView {...props} {...args} items={items} >
    {item => (
      <Item key={item.name} textValue={item.name} data-id={item.key}>
        <Box isRow >
          <Box isRow mr="auto" alignSelf="center" >
            <Icon icon={FormSelectIcon} mr="sm" color="accent.40" size="md" />
            <Text variant="itemTitle" alignSelf="center">{item.name}</Text>
          </Box>
          <Box isRow alignSelf="center" gap="sm" >
            <IconButton aria-label="create-icon" >
              <Icon icon={CreateIcon} size="sm" />
            </IconButton>
            <IconButton aria-label="actions-icon" size="sm" >
              <Icon icon={MoreVertIcon} size="sm" />
            </IconButton>
          </Box>
        </Box>
      </Item>
    )}
  </ListView>
);

export const InfiniteLoadingList = (args) => {
  const getMockData = async (signal, cursor) => {
    let pageNumber = 1;
    if (cursor) {
      pageNumber = Number(cursor.substr(cursor.indexOf('-') + 1));
    }
    // With this we will emulate load even with mocked API, except for Chromatic runs
    if (!args.useMockData) await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));
    return {
      items: animals.slice((pageNumber - 1) * 10, pageNumber * 10),
      cursor: `mock-${pageNumber + 1}`,
    };
  };
  const fetchApiData = async (signal, cursor, filterText) => {
    if (args.useMockData) return getMockData();

    try {
      // this race will throw an error if api won't respond in 3 seconds
      const res = await Promise.race([
        // If no cursor is available, then we're loading the first page,
        // filtering the results returned via a query string that
        // mirrors the ComboBox input text.
        // Otherwise, the cursor is the next URL to load,
        // as returned from the previous page.
        fetch(cursor || `https://swapi.dev/api/people/?search=${filterText}`, {
          signal,
        }),
        new Promise((_resolve, reject) =>
          setTimeout(() => reject(new Error('timeout')), 3000),
        ),
      ]);
      const json = await res.json();
      // The API is too fast sometimes, so make it take longer so we can see the loader
      await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));

      return {
        items: json.results,
        cursor: json.next,
      };
    } catch (e) {
      return getMockData();
    }
  };

  const list = useAsyncList({
    async load({ signal, cursor, filterText }) {
      if (cursor) {
        // eslint-disable-next-line
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      // check if we are mocking pages
      if (cursor && cursor.includes('mock')) {
        return getMockData(signal, cursor, filterText);
      }
      return fetchApiData(signal, cursor, filterText);
    },
  });

  return (
    <Box
      sx={{
        maxHeight: '400px',
      }}
    >
      <ListView
        {...actions}
        items={list.items}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {item => (
          <Item key={item.name} textValue={item.name}>
            <ListElement item={item} />
          </Item>
        )}
      </ListView>
    </Box>
  );
};

InfiniteLoadingList.args = {
  useMockData: isChromatic(),
};

InfiniteLoadingList.parameters = {
  docs: {
    description: {
      story: 'Note: Keep in mind the maxHeight may impact when the scroll callback is triggered. If you notice it\'s being called too often, try adjusting that value or loading more objects to prevent this behavior.',
    },
  },
};


export const MultipleSelection = ({ ...args }) => (
  <ListView {...props} {...args} items={items} selectionMode="multiple">
    {item => (
      <Item key={item.name} textValue={item.name}>
        <ListElement item={item} />
      </Item>
    )}
  </ListView>
);
