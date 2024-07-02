import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import {NewsType} from '../redux/news.slice';
import React, {useState, useCallback, useEffect} from 'react';
import {IconOutline} from '@ant-design/icons-react-native';

const {width} = Dimensions.get('window');

interface NewsProps {
  piece: NewsType;
}

const NewsItem: React.FC<NewsProps> = ({piece}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hours, setHours] = useState(0);

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.

    await Linking.openURL(
      // 'https://www.capitalfm.co.ke/sports/2024/06/26/kenyans-keen-to-close-continental-champs-on-high-with-more-medals/',
      piece.link,
    );
  }, [piece.link]);

  const handleTime: (value: string) => number = value => {
    return (
      parseInt(new Date().getUTCHours()) -
      parseInt(new Date(value).getUTCHours())
    );
  };

  useEffect(() => {
    setHours(handleTime(piece.pubDate));
  }, [piece]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          // uri: 'https://images.pexels.com/photos/954583/pexels-photo-954583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          uri:
            piece.image_url !== null
              ? piece.image_url
              : 'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1',
        }}
        style={styles.newsContainer}>
        <View style={styles.overlayView} />
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginBottom: 5,
            }}>
            <Image
              source={{
                // uri: 'https://i.bytvi.com/domain_icons/capitalfm.png',
                uri: piece.source_icon,
              }}
              width={30}
              height={30}
            />
            <Text style={styles.contentTitle}>
              {piece.source_id} . {hours} hour{`${hours > 1 ? 's' : ''}`} ago
            </Text>
          </View>
          <Text style={styles.contentText}>{piece.title}</Text>
        </View>
      </ImageBackground>
      <TouchableOpacity
        style={styles.footerView}
        onPress={() => {
          setModalVisible(true);
        }}>
        <IconOutline name="file-text" size={24} />
        <Text>View Summary</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <ImageBackground
            source={{
              // uri: 'https://images.pexels.com/photos/954583/pexels-photo-954583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              uri:
                piece.image_url !== null
                  ? piece.image_url
                  : 'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1',
            }}>
            <View style={styles.overlayView} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <IconOutline size={24} name="close" color="#fff" />
            </Pressable>
            <View style={[styles.contentContainer, {marginBottom: 20}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 5,
                }}>
                <Image
                  source={{
                    // uri: 'https://i.bytvi.com/domain_icons/capitalfm.png',
                    uri: piece.source_icon,
                  }}
                  width={30}
                  height={30}
                />
                <Text style={styles.contentTitle}>
                  {piece.source_id} . {hours} hour{`${hours > 1 ? 's' : ''}`}{' '}
                  ago
                </Text>
              </View>
              <Text style={styles.contentText}>{piece.title}</Text>
            </View>
          </ImageBackground>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                marginTop: 30,
                paddingHorizontal: 20,
                color: '#000',
                lineHeight: 30,
              }}>
              {piece.description}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                width: width * 0.8,
                borderRadius: 10,
              }}
              onPress={() => handlePress()}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  padding: 10,
                  fontSize: 20,
                }}>
                {' '}
                Go to full article
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    borderColor: '#dcdbdb',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  contentContainer: {
    padding: 10,
  },
  contentTitle: {
    color: '#fff',
    fontSize: 17,
  },
  contentText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  newsContainer: {
    width: width * 0.9,
    height: 300,
    objectFit: 'contain',
    justifyContent: 'flex-end',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  overlayView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  buttonClose: {
    backgroundColor: '#000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
