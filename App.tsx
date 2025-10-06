/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import branch from 'react-native-branch';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const branchSubscribe = branch.subscribe({
      onOpenStart: ({uri, cachedInitialEvent}) => {
        console.log(
          '[branch.io] subscribe onOpenStart, will open ' +
            uri +
            ' cachedInitialEvent is ' +
            cachedInitialEvent,
        );
      },
      onOpenComplete: ({ error, params, uri }) => {
        if (error) {
          console.error(`[branch.io] subscribe onOpenComplete, Error from opening uri: ${uri} Error: ${error}`);
          return;
        }
        else {
          console.log(`[branch.io] effect subscribe: ${JSON.stringify(params)}`);
        }
      },
    });

    return () => {
      branchSubscribe();
    };
  }, []);

  const ceateBranchLink = async () => {
    console.log("Create Branch Link");
    let buo = await branch.createBranchUniversalObject('referAndEarn', {
      locallyIndex: true,
      title: 'CashKaro App Referral',
      contentDescription: 'Invite your friends and earn rewards!',
      contentMetadata: {
        customMetadata: {
          r: 'john123',
          refName: 'johnDoe',
          source: 'android',
        },
      },
    });

    let linkProperties = {
      feature: 'referral',
      channel: 'app',
      campaign: 'appReferral',
    };

    let controlParams = {
    };

    let { url } = await buo.generateShortUrl(linkProperties, controlParams);
  }

  const fetchLatData = async () => {
    try {
      const attributionWindow = 1;
      const latd = await branch.lastAttributedTouchData(attributionWindow);
      if (latd) {
        console.log(latd)
        console.log(`[branch.io] fetch LATD successfully: ${JSON.stringify(latd)}`);
      }
    } catch (error) {
      console.error('[branch.io] Fails fetching LATD: ', error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Create Link">
            <Button
              title="Press me"
              onPress={ceateBranchLink}
            />
          </Section>
          <Section title="Fetch LATD">
            <Button
              title="Press me"
              onPress={fetchLatData}
            />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
