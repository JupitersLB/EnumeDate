import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { useTailwind } from 'tailwind-rn/dist'
import { IEvent } from '../../stores/models/event'
import { EventCard } from '../cards/eventCard'

const EventList: FC<{ events: IEvent[] }> = ({ events }) => {
  const [data, setData] = useState(events)
  const tailwind = useTailwind()

  const renderItem = ({ item, drag, isActive }: RenderItemParams<IEvent>) => (
    <EventCard event={item} drag={drag} isActive={isActive} />
  )

  return (
    <DraggableFlatList
      containerStyle={tailwind('flex flex-grow')}
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  )
}

export default observer(EventList)
