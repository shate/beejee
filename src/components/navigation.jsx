import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import { setPage } from "../../store/filterSlice"
import { useEffect, useState } from "react"

export default function Navigation({count, swipe}) {
  const dispatch = useDispatch()
  const [copyPage, setCopyPage] = useState(1)

  const pagination = (right = false) => {
    if (right) {
      if (copyPage < count) {
        setCopyPage(prev => prev + 1)
      }
    } else {
      if (copyPage > 1) {
        setCopyPage(prev => prev - 1)
      }
    }
  }

  useEffect(() => {
    if(swipe){
      swipe === 'left' ? pagination(true) : pagination()
    }

  }, [swipe])


  useEffect(() => {
      dispatch(setPage(copyPage))
    },
    [copyPage]
  )
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.arrow, copyPage === 1 && styles.disable]}
        onPress={() => pagination()}
        disabled={copyPage === 1}
        activeOpacity={.5}
      >
        <Text style={styles.chevron}>&#10094;</Text>
      </TouchableOpacity>
      <Text>{`стр. ${copyPage} из ${count}`}</Text>
      <TouchableOpacity
        style={[styles.arrow, copyPage === count && styles.disable]}
        onPress={() => pagination(true)}
        disabled={copyPage === count}
        activeOpacity={.5}
      >
        <Text style={styles.chevron}>&#10095;</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    height: 30,
    width: 50,
    backgroundColor: 'rgba(181,185,189,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 20,
    marginTop: -2
  },
  disable: {
    opacity: .1
  }

})
