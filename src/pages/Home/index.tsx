import React, { useState, BaseSyntheticEvent } from 'react'
import Send from '@mui/icons-material/Send'
import AndroidIcon from '@mui/icons-material/Android'
import WindowIcon from '@mui/icons-material/Window'
import LoginIcon from '@mui/icons-material/Login'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import CachedIcon from '@mui/icons-material/Cached'
import { useTranslation } from "react-i18next"
import { DialogContentText, Stack } from '@mui/material'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector'
import { AuthActions } from '@/reduxSaga/authRedux'
import { globalLoading } from '@/components/GlobalLoading'
import { globalModal } from '@/components/Modals/GlobalModal'
import Colors from '@/themes/Colors'
import useMediaQuery from '@/hooks/useMediaQuery'
import useDebounce from '@/hooks/useDebounce'
import Sidebar, { sidebar } from '@/layouts/partials/Sidebar'
import { SidebarItemConfiguration } from '@/layouts/partials/Sidebar/types'
import useNetworkStatus from '@/hooks/useNetworkStatus'

const Home = () => {
  const { isSignedIn } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const handleItemClick = () => { }
  const { t, i18n: { changeLanguage, resolvedLanguage } } = useTranslation()

  const LIST_ITEM: SidebarItemConfiguration[] = isSignedIn ? [
    { label: "Item 5", href: "/item-05", onClick: handleItemClick, Icon: <Send /> },
    {
      label: "Item 6",
      href: "/link-6",
      subMenu: [
        { label: "Item 6.1", href: "/item-61", onClick: handleItemClick, Icon: <Send /> },
        {
          label: "Item 6.2", subMenu: [
            { label: "Item 6.2.1", href: "/item-621", onClick: handleItemClick, Icon: <Send /> },
            { label: "Item 6.2.2", href: "/item-622", onClick: handleItemClick, Icon: <Send /> },
            {
              label: "Item 6.2.3", href: "/item-623", Icon: <Send />, subMenu: [
                { label: "Item 6.2.3.1", href: "/item-6231", onClick: handleItemClick, Icon: <Send /> }
              ]
            }
          ],
          href: "/link-62"
        },
        { label: "Item 6.3", href: "/item-63", onClick: handleItemClick, Icon: <Send /> },
      ]
    },
    {
      label: "Logout", href: "/login", onClick: () => {
        dispatch(AuthActions.logoutSuccess())
      }
    }
  ] : [
    { label: "Item 1", href: "/item-01", onClick: handleItemClick, Icon: <Send /> },
    { label: "Item 2", href: "/item-02", Icon: <Send /> },
    {
      label: "Item 3",
      href: "/link-3",
      Icon: <AndroidIcon />,
      subMenu: [
        { label: "Item 3.1", href: "/item-31", onClick: handleItemClick, Icon: <Send /> },
        { label: "Item 3.2", href: "/item-32", onClick: handleItemClick, Icon: <Send /> },
        {
          label: "Item 3.3", href: "/item-33", Icon: <Send />, subMenu: [
            { label: "Item 3.3.1", href: "/item-331", onClick: handleItemClick, Icon: <Send /> },
          ]
        },
      ]
    },
    {
      label: "Item 4",
      href: "/link-4",
      Icon: <WindowIcon />,
      subMenu: [
        { label: "Item 4.1", href: "/item-41", onClick: handleItemClick, Icon: <Send /> },
        { label: "Item 4.2", href: "/item-42", onClick: handleItemClick, Icon: <Send /> },
        {
          label: "Item 4.3", href: "/item-43", Icon: <AndroidIcon />, subMenu: [
            { label: "Item 4.3.1", href: "/item-431", onClick: handleItemClick, Icon: <Send /> },
          ]
        },
        {
          label: "Item 10",
          Icon: <WindowIcon />,
          href: "/link-10",
          subMenu: [
            { label: "Item 10.1", href: "/item-101", onClick: handleItemClick, Icon: <Send /> },
            { label: "Item 10.2", href: "/item-102", onClick: handleItemClick, Icon: <Send /> },
            {
              label: "Item 10.3", href: "/item-103", Icon: <AndroidIcon />, subMenu: [
                { label: "Item 10.3.1", href: "/item-1031", onClick: handleItemClick, Icon: <Send /> },
              ]
            },
          ]
        },
      ]
    },
    {
      label: "Login", href: "/signed-in", onClick: () => {
        dispatch(AuthActions.loginSuccess())
      }, Icon: <LoginIcon />,
    },
    {
      label: "Toggle Collapsed", onClick: sidebar.toggleCollapse, href: "/toggle-collapsed", isRenderLink: false, Icon: <CachedIcon />, closeOnClick: false
    },
    {
      label: "Close Sidebar", onClick: sidebar.close, href: "/close-sidebar", isRenderLink: false, Icon: <DoDisturbIcon />
    }
  ]

  const openGlobalLoading = () => {
    globalLoading.show()
    setTimeout(() => {
      globalLoading.hide()
    }, 3000)
  }

  const openGlobalModal = () => {
    globalModal.open({
      title: "ThisKw's Modal",
      children: (
        <div
          style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <h1 onClick={() => console.log("flow: click")}>GlobalModal: Click to Close</h1>
          </div>
        </div>
      )
    })
  }

  const openAlert = () => {
    globalModal.open({
      title: "Use Google's location service?",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      footer: null,
      closable: false,
      children: (
        <DialogContentText>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</DialogContentText>
      )
    })
  }

  const isSmallScreen = useMediaQuery("(max-width: 1000px)")

  const [valueToDebounce, setValueToDebounce] = useState<string>("")
  const debouncedValue = useDebounce(valueToDebounce, 1000)

  const isOneline = useNetworkStatus()

  return <div style={{ display: "flex" }}>
    <Sidebar options={LIST_ITEM} />

    <Container>
      <h1>ReactJs's Base 2023 - {isSignedIn ? "Signed In" : "Logout!!!"}</h1>

      <Section>
        <button onClick={sidebar.open}>Open Sidebar</button>
        <button onClick={openGlobalLoading}>Open Global Loading In 3s</button>
        <button onClick={openGlobalModal}>Open Global Modal</button>
        <button onClick={openAlert}>Open Alert</button>
      </Section>

      <Section>
        <h3>Example use customHook <ImportantText>useMediaQuery</ImportantText></h3>
        <p style={{ color: isSmallScreen ? Colors.primary : "red" }}>This text will change color to blue when screen's width is equal or less than 1000px. Let resize screen's width.</p>
      </Section>

      <Section>
        <h3>Example use customHook <ImportantText>useDebounce</ImportantText></h3>
        <input type="text" value={valueToDebounce} onChange={(e: BaseSyntheticEvent) => setValueToDebounce(e.target.value)} />
        <p>Input's value (delay: 1000ms): <span style={{ color: "red" }}>{debouncedValue}</span></p>
      </Section>

      <Section>
        <button onClick={() => changeLanguage(resolvedLanguage === "vi" ? "en" : "vi")}>{t('change_lang')}</button>
      </Section>

      <Section>
        <Stack direction="row" alignItems="center" columnGap={1}>
          <span style={{ height: 28, width: 28, borderRadius: "50%", backgroundColor: isOneline ? "green" : "red", display: "inline-block" }}></span>
          <p>Network Status:<span style={{ color: isOneline ? "green" : "red", fontWeight: 700, marginLeft: 6 }}>{isOneline ? "Online" : "Offline"}</span></p>
        </Stack>
      </Section>
    </Container>
  </div>
}

export default Home

const Container = styled.div`
  padding: 0 20px;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`

const ImportantText = styled.span`
  color: ${Colors.primary};
  text-decoration: underline;
  font-weight: 700;
`

const Section = styled.section`
  &:nth-child(odd) {
    background-color: #1976d21a;
  }
  padding: 20px;
  border: 1px black dashed;
`