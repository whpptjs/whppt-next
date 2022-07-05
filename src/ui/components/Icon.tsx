import React, { FC } from "react";
import { WhpptIconDashboard } from "../../icons/Dashboard";
import { WhpptIconFooter } from "../../icons/Footer";
import { WhpptIconGlobe } from "../../icons/Globe";
import { WhpptIconNewPage } from "../../icons/NewPage";
import { WhpptIconPageSettings } from "../../icons/PageSettings";
import { WhpptIconPointer } from "../../icons/Pointer";
import { WhpptIconPublish } from "../../icons/Publish";
import { WhpptIconSave } from "../../icons/Save";
import { WhpptIconSettings } from "../../icons/Settings";
import { WhpptIconNav } from "../../icons/Nav";
import { WhpptIconLogout } from "../../icons/Logout";
import { WhpptIconBruce } from "../../icons/WhpptBruce";
import { WhpptIconClose } from "../../icons/Close";
import { WhpptIconBold } from "../../icons/Bold";
import { WhpptIconBulletList } from "../../icons/BulletList";
import { WhpptIconHeader1 } from "../../icons/Header1";
import { WhpptIconHeader2 } from "../../icons/Header2";
import { WhpptIconHeader3 } from "../../icons/Header3";
import { WhpptIconHeader4 } from "../../icons/Header4";
import { WhpptIconItalic } from "../../icons/Italic";
import { WhpptIconRedo } from "../../icons/Redo";
import { WhpptIconUnderline } from "../../icons/Underline";
import { WhpptIconUndo } from "../../icons/Undo";
import { WhpptIconChainLink } from "../../icons/ChainLink";
import { WhpptIconParagraph } from "../../icons/Paragraph";
import { WhpptIconLeftAlign } from "../../icons/LeftAlign";
import { WhpptIconRightAlign } from "../../icons/RightAlign";
import { WhpptIconCenterAlign } from "../../icons/CenterAlign";
import { WhpptIconBin } from "../../icons/Bin";
import { WhpptIconDuplicate } from "../../icons/Duplicate";
import { WhpptIconNext } from "../../icons/Next";
import { WhpptIconPrevious } from "../../icons/Previous";
import { WhpptIconDown } from "../../icons/Down";

export const WhpptIcon: FC<{ is: String }> = ({ is }) => {
  if (is === "pointer") return <WhpptIconPointer></WhpptIconPointer>;
  if (is === "new-page") return <WhpptIconNewPage></WhpptIconNewPage>;
  if (is === "save") return <WhpptIconSave></WhpptIconSave>;
  if (is === "nav") return <WhpptIconNav></WhpptIconNav>;
  if (is === "footer") return <WhpptIconFooter></WhpptIconFooter>;
  if (is === "publish") return <WhpptIconPublish></WhpptIconPublish>;
  if (is === "globe") return <WhpptIconGlobe></WhpptIconGlobe>;
  if (is === "settings") return <WhpptIconSettings></WhpptIconSettings>;
  if (is === "page-settings")
    return <WhpptIconPageSettings></WhpptIconPageSettings>;
  if (is === "dashboard") return <WhpptIconDashboard></WhpptIconDashboard>;
  if (is === "logout") return <WhpptIconLogout></WhpptIconLogout>;
  if (is === "bruce") return <WhpptIconBruce></WhpptIconBruce>;
  if (is === "close") return <WhpptIconClose></WhpptIconClose>;
  if (is === "bold") return <WhpptIconBold></WhpptIconBold>;
  if (is === "bullet-list") return <WhpptIconBulletList></WhpptIconBulletList>;
  if (is === "chain-link") return <WhpptIconChainLink></WhpptIconChainLink>;
  if (is === "header-1") return <WhpptIconHeader1></WhpptIconHeader1>;
  if (is === "header-2") return <WhpptIconHeader2></WhpptIconHeader2>;
  if (is === "header-3") return <WhpptIconHeader3></WhpptIconHeader3>;
  if (is === "header-4") return <WhpptIconHeader4></WhpptIconHeader4>;
  if (is === "italic") return <WhpptIconItalic></WhpptIconItalic>;
  if (is === "redo") return <WhpptIconRedo></WhpptIconRedo>;
  if (is === "underline") return <WhpptIconUnderline></WhpptIconUnderline>;
  if (is === "undo") return <WhpptIconUndo></WhpptIconUndo>;
  if (is === "paragraph") return <WhpptIconParagraph></WhpptIconParagraph>;
  if (is === "left-align") return <WhpptIconLeftAlign></WhpptIconLeftAlign>;
  if (is === "right-align") return <WhpptIconRightAlign></WhpptIconRightAlign>;
  if (is === "center-align")
    return <WhpptIconCenterAlign></WhpptIconCenterAlign>;
  if (is === "bin") return <WhpptIconBin></WhpptIconBin>;
  if (is === "duplicate") return <WhpptIconDuplicate></WhpptIconDuplicate>;
  if (is === 'next') return <WhpptIconNext></WhpptIconNext>
  if (is === 'previous') return <WhpptIconPrevious></WhpptIconPrevious>
  if (is === 'down') return <WhpptIconDown></WhpptIconDown>
  return <div></div>;
};