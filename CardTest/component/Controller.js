import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = (item) => (
  <View style={styles.item}>
    <Text style={styles.title} key={item.cedula}>
      Cedula:{item.cedula}
    </Text>
    <Text style={styles.details} key={item.nombres}>
      Nombres:{item.nombres}
    </Text>
  </View>
);

// the filter
const List = (props) => {
  const renderItem = ({ item, cedula }) => {
    // when no input, show all
    /*   if (props.searchPhrase === "") {
      return <Item name={item.cedula} />;
    } */
    // filter of the name
    if (
      item.cedula
      /* .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, "")) */
    ) {
      return <Item key={cedula} />;
    }
    // filter of the description
    if (
      item.nombres
      /* .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, "")) */
    ) {
      return <Item key={item.nombres} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
