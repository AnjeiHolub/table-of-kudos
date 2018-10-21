import {OrderedMap, Map} from 'immutable';

export function arrayToMap (array, ModelRecord = Map) {
    return array.reduce((previousValue, item) => {
        return previousValue.set(item.id, new ModelRecord(item)); //элементы item - заворачиваем в Map (иммутабельный объект от immutable) 
    }, new OrderedMap({}));  //заворачиваем в Map (иммутабельный объект от immutable) 
}

export function mapToArray (immutableMap) {
    return immutableMap.valueSeq().toArray();
}