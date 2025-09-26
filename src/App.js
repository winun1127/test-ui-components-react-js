import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Header,
  HeaderLogo,
  HeaderButton,
  HeaderActions,
  UserProfile,
} from "@/components/header";
import { LeftNavigationBar } from "@/components/left-navigation-bar";
import {
  MainContentArea,
  MainContentBody,
  MainContentHeader,
} from "@/components/main-content-area";
import TitleNavigator from "@/components/title-navigator";
import { Card } from "@/components/card";

function App() {
  return (
    <SidebarProvider>
      <Header>
        <HeaderLogo>E-Forest Logo</HeaderLogo>
        <HeaderButton isOn={true}>공장종합</HeaderButton>
        <HeaderButton>프레스</HeaderButton>
        <HeaderButton>차체</HeaderButton>
        <HeaderActions>
          <UserProfile name="홍길동" part="E-Forest 전략팀" />
        </HeaderActions>
      </Header>
      <LeftNavigationBar />
      <MainContentArea>
        <MainContentHeader>
          <TitleNavigator />
        </MainContentHeader>
        <MainContentBody>
          <Card />
          <Card />
          <Card />
          <Card />
        </MainContentBody>
      </MainContentArea>
    </SidebarProvider>
  );
}

export default App;
