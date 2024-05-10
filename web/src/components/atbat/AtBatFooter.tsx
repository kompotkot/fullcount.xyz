import styles from "./AtBatFooter.module.css";
import { AtBatStatus, Token } from "../../types";
import TokenCardSmall from "./TokenCardSmall";
import { useEffect, useRef, useState } from "react";
import TokenCard from "./TokenCard";

const AtBatFooter = ({ atBat }: { atBat: AtBatStatus }) => {
  const [showDetailsFor, setShowDetailsFor] = useState<Token | undefined>(undefined);
  const tokenCardRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (tokenCardRef.current && !tokenCardRef.current.contains(event.target as Node)) {
      setShowDetailsFor(undefined);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);
  const handleClick = (token: Token | undefined) => {
    setShowDetailsFor(token);
  };

  return (
    <div className={styles.container}>
      {showDetailsFor && (
        <TokenCard
          token={showDetailsFor}
          isPitcher={showDetailsFor === atBat.pitcher}
          ref={tokenCardRef}
        />
      )}
      {atBat.pitcher ? (
        <TokenCardSmall
          token={atBat.pitcher}
          isPitcher={true}
          isForGame={true}
          onClick={() => handleClick(atBat.pitcher)}
        />
      ) : (
        <div style={{ width: "112px" }} />
      )}
      <div className={styles.vs}>VS</div>
      {atBat.batter ? (
        <TokenCardSmall
          token={atBat.batter}
          isPitcher={false}
          isForGame={true}
          onClick={() => handleClick(atBat.batter)}
        />
      ) : (
        <div style={{ width: "112px" }} />
      )}
    </div>
  );
};

export default AtBatFooter;
