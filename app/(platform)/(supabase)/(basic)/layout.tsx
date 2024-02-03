import { cx } from "class-variance-authority";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx("flex h-full justify-center items-center")}>
      {children}
    </div>
  );
};

export default ClerkLayout;
