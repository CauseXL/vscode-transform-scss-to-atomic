// /* eslint-disable */
// import RoutePath from 'src/configs/router/RoutePath';
// import React, { FC, memo, ReactElement, useCallback, useMemo, useState } from 'react';
// import { CloseOutlined, DownOutlined } from '@tezign/icons';
// import { Button, Dropdown, MenuProps, message, Popconfirm } from '@tezign/tezign-ui';
// import { useRequest } from 'ahooks';
// import { generatePath } from 'react-router-dom';
// import cx from 'classnames';
// import { apiEditReadinessLightStatus, apiGetPortalTopPermission, AuthType, ReadinessDetailsReq } from '../api';
// import style from './styles/readiness.module.scss';

// // * ------------------------------------------------ inter

// export type StatusType = 'green' | 'yellow' | 'red' | 'gray' | 'empty';

// interface StatusActionItemProp {
//   type: StatusType;
//   id: number;
//   portalBlockId: number;
//   portalId: number;
//   categoryId: number;
//   refresh: (param) => void;
//   detailFilter: Partial<ReadinessDetailsReq>
// }

// // * ------------------------------------------------ comp

// const RedStatus: FC<{ id: number; categoryId: number; refresh: (param) => void; detailFilter?: any }> = memo(({ id, categoryId, refresh, detailFilter }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { run: editLightStatus } = useRequest((param) => apiEditReadinessLightStatus(param), {
//     manual: true,
//     debounceWait: 300,
//     refreshDeps: [detailFilter],
//     onSuccess: () => {
//       refresh({
//         ...detailFilter,
//         isLightChange: true,
//         categoryId
//       });
//       message.success('状态修改成功！');
//     }
//   });

//   const handleOpenChange = (flag: boolean) => {
//     setIsOpen(flag);
//   };

//   const onConfirm = useCallback(() => {
//     if (!id) { return false; }
//     const param = {
//       id,
//       manualLightStatus: 1
//     };
//     editLightStatus(param);
//     setIsOpen(false);
//   }, [id, editLightStatus]);

//   const items: MenuProps['items'] = useMemo(() => ([
//     {
//       label: (
//         <Popconfirm placement="bottomLeft" title="确认修改状态吗？" onConfirm={ onConfirm }>
//           <div style={ { display: 'flex', justifyContent: 'center', minWidth: 42 } }>
//             <StatusItem type="gray"/>
//           </div>
//         </Popconfirm>
//       ),
//       key: 'changeToGrayLight'
//     }
//   ]), [onConfirm]);

//   return (
//     <div className={ style['readiness-status-action'] }>
//       <div className={ style['readiness-status-action__item'] }>
//         <StatusItem type="red"/>
//       </div>
//       <div className={ style['readiness-status-action__item-dropdown'] }>
//         <Dropdown menu={ { items } } trigger={ ['click'] } placement="bottom" open={ isOpen } onOpenChange={ handleOpenChange }>
//           <Button className={ style['readiness-status-action__item-button'] } type="secondary">
//             <div className={ style['readiness-status-action__item-button-container'] }>
//               <StatusItem type="red"/>
//               <DownOutlined className={ style['readiness-status-action__item-icon'] }/>
//             </div>
//           </Button>
//         </Dropdown>
//       </div>
//     </div>
//   );
// });

// // * ------------------------------------------------

// const GrayStatus: FC<Partial<StatusActionItemProp>> = memo(({ id, categoryId, refresh, detailFilter }) => {
//   const { run: editLightStatus } = useRequest((param) => apiEditReadinessLightStatus(param), {
//     manual: true,
//     onSuccess: () => {
//       refresh?.({
//         ...detailFilter,
//         isLightChange: true,
//         categoryId
//       });
//       message.success('状态修改成功！');
//     }
//   });

//   const onConfirm = () => {
//     if (!id) { return false; }
//     const param = {
//       id,
//       manualLightStatus: -1
//     };
//     editLightStatus(param);
//   };

//   return (
//     <div className={ style['readiness-status-action'] }>
//       <div className={ style['readiness-status-action__item'] }>
//         <StatusItem type="gray"/>
//       </div>
//       <div className={ style['readiness-status-action__item-dropdown'] }>
//         <Popconfirm placement="bottomLeft" title="确认修改状态吗？" onConfirm={ onConfirm }>
//           <Button className={ style['readiness-status-action__item-button'] } type="secondary">
//             <div className={ style['readiness-status-action__item-button-container'] }>
//               <StatusItem type="gray"/>
//               <CloseOutlined className={ style['readiness-status-action__item-icon'] }/>
//             </div>
//           </Button>
//         </Popconfirm>
//       </div>
//     </div>
//   );
// });

// // * ------------------------------------------------

// const GreenStatus: FC<Partial<StatusActionItemProp>> = memo(({ portalBlockId, portalId }) => {
//   const portalIdStr = btoa(String(portalId));
//   const { runAsync: getAuth } = useRequest(() => apiGetPortalTopPermission({ portalId: portalIdStr }), { manual: true });

//   const handleClick = useCallback(async () => {
//     const portalAuth = await getAuth();
//     if (portalAuth !== AuthType.EDIT) {
//       return message.warning('暂无权限查看Portal！');
//     }
//     window.open(`${generatePath(RoutePath.portal_detail, { portalId: portalIdStr })}#blockAnchor-${portalBlockId}`, '_blank', 'noopener');
//   }, [getAuth, portalBlockId, portalIdStr]);

//   return (
//     <div className={ style['readiness-status-action'] }>
//       <div className={ style['readiness-status-action__item'] }>
//         <StatusItem type="green"/>
//       </div>
//       <div className={ style['readiness-status-action__item-dropdown'] }>
//         <Button className={ style['readiness-status-action__item-button'] } type="secondary" onClick={ handleClick }>
//           <div className={ style['readiness-status-action__item-button-container'] }>
//             <StatusItem type="green"/>
//           </div>
//         </Button>
//       </div>
//     </div>

//   );
// });

// // * ------------------------------------------------

// const YellowStatus: FC = () => {
//   return <StatusItem type="yellow"/>;
// };

// const EmptyStatus: FC = () => {
//   return <StatusItem type="empty"/>;
// };

// const StatusItem: FC<{ type: StatusType }> = ({ type }) => {
//   return (
//     <span
//       className={ cx(style['readiness-status-circle'], style['readiness-status-circle--large'], style[`readiness-status-circle--${type}`]) }
//     />
//   );
// };

// export const StatusActionItem: FC<StatusActionItemProp> = memo(({ type = 'empty', id, portalBlockId, portalId, categoryId, refresh, detailFilter }) => {
//   const map: Record<StatusType, ReactElement> = {
//     green: <GreenStatus portalId={ portalId } portalBlockId={ portalBlockId }/>,
//     red: <RedStatus id={ id } categoryId={ categoryId } refresh={ refresh } detailFilter={ detailFilter }/>,
//     gray: <GrayStatus id={ id } categoryId={ categoryId } refresh={ refresh } detailFilter={ detailFilter }/>,
//     yellow: <YellowStatus/>,
//     empty: <EmptyStatus/>
//   };
//   return map[type];
// });
