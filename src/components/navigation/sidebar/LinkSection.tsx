import { useState } from 'react';
import Link from 'next/link';
import { Badge, Divider, Spacer } from "@heroui/react";
import clsx from 'clsx';
import { LinkModel } from '@/src/components/navigation/sidebar/SideBar';
import { CustomToolTip } from '@/src/components/tooltip/CustomTooltip';

interface Props {
  pathname: string;
  finalLinks: LinkModel[];
  isCollapsed: boolean;
}

export function LinkSection({ pathname, finalLinks, isCollapsed }: Props) {
  const [openLinkIndex, setOpenLinkIndex] = useState<number | null>(null);

  const handleLinkClick = (index: number) => {
    setOpenLinkIndex((prevIndex) => index);
  };

  return (
    <div className={`flex w-full flex-col`}>
      {finalLinks.map((link, index) => {
        const isOpen = openLinkIndex === index;

        const isActive =
          link.links && link.links.some((sublink) => pathname === sublink.href);

        const currentLink = link.href && pathname.includes(link.href);

        // Check if any sublink has a notification
        const hasNotification =
          link.links && link.links.some((sublink) => sublink.notification);

        return (
          <div key={index}>
            <Link
              key={index}
              href={link.href ?? ''}
              onClick={() => handleLinkClick(index)}
              passHref
              className="flex w-full  items-center "
            >
              <Divider
                style={{
                  width: 4,
                  height: 20,
                  borderRadius: 50,
                  background:
                    pathname === link.href ? '#008060' : 'transparent',
                }}
                orientation="vertical"
              />
              <Spacer />
              <div
                className={clsx(
                  'my-0.5 flex w-full cursor-pointer items-center justify-start text-nowrap rounded-lg px-1 py-2 text-medium hover:bg-default-100',
                  currentLink || isActive ? 'bg-default-100' : '',
                )}
              >
                {link.icon}
                <Spacer />
                {!isCollapsed && (
                  <div
                    className={
                      'flex w-full flex-row items-center justify-between pr-2'
                    }
                  >
                    <p>{link.name}</p>
                    {hasNotification && (
                      <Badge
                        content="!"
                        color="danger"
                        placement="bottom-right"
                      >
                        <></>
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Link>
            <Spacer />
            {isOpen && link.links && (
              <div className={`flex w-full flex-col`}>
                {link.links.map((sublink, index) => (
                  <SidebarLinkComponent
                    info={sublink.info}
                    notification={sublink.notification}
                    key={index}
                    pathname={pathname}
                    index={index}
                    link={sublink}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SidebarLinkComponent({
  pathname,
  index,
  isCollapsed,
  link,
  notification,
  info,
}: {
  pathname: string;
  index?: number;
  link: LinkModel;
  isCollapsed: boolean;
  notification?: boolean;
  info?: string;
}) {
  return (
    <Link
      style={{
        paddingLeft: 12,
        paddingRight: 12,
      }}
      key={index}
      href={link.href ?? ''}
      passHref
      className="flex w-full items-center"
    >
      <Divider
        style={{
          width: 4,
          height: 20,
          borderRadius: 50,
          background: pathname === link.href ? '#008060' : 'transparent',
        }}
        orientation="vertical"
      />
      <Spacer />
      <div
        className={clsx(
          'my-0.5 flex w-full cursor-pointer items-center justify-start text-nowrap rounded-lg px-1 py-2 text-medium hover:bg-default-100',
          link.href && pathname.includes(link.href) && 'bg-default-100',
        )}
      >
        {link.icon}
        <Spacer />
        {!isCollapsed && (
          <div
            className={'flex w-full flex-row items-center justify-between pr-2'}
          >
            <p>{link.name}</p>
            {notification && info && (
              <CustomToolTip info={info}>
                <Badge content="!" color="danger" placement="bottom-right">
                  <></>
                </Badge>
              </CustomToolTip>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
