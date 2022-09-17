import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type MenuItem = {
  label: string;
  link: string;
};

const menuItems: MenuItem[] = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Menu',
    link: '/',
  },
  {
    label: 'Animation',
    link: '/',
  },
  {
    label: 'Demo',
    link: '/',
  },
];

const Nav = styled.nav`
  position: relative;
  display: flex;
  font-size: 1.2rem;
  width: 100%;
  justify-content: flex-end;
  a {
    padding: 4rem;
    color: #aaa;
    cursor: pointer;
  }
`;

const Bar = styled(motion.div)`
  position: absolute;
  top: 42px;
  border-radius: 5px;
  width: 100px;
  height: 0.2rem;
  background: #646cff99;
  filter: drop-shadow(0 0 0.5em #646cffaa);
`;

const MenuItem: React.FC<
  MenuItem & {
    isHovered: boolean;
    isSelected: boolean;
    isDark: boolean;
    onSelected: React.Dispatch<React.SetStateAction<HTMLAnchorElement | null>>;
  }
> = ({ label, link, isHovered, isSelected, isDark, onSelected }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) {
      onSelected(ref.current);
    }
  }, [isSelected]);

  return (
    <motion.a
      ref={ref}
      animate={
        isHovered || (isSelected && !isDark)
          ? { opacity: 1, translateY: -30 }
          : isDark
          ? { opacity: 0.2, translateY: 0 }
          : { opacity: 0.6, translateY: 0 }
      }
    >
      {label}
    </motion.a>
  );
};

const Menu = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSelected, setCurrentSelected] = useState(0);
  const [currentHovered, setCurrentHovered] = useState<number | null>(null);

  const [selectedEl, setSelectedEl] = useState<HTMLAnchorElement | null>(null);
  const [selectedWidth, setSelectedWidth] = useState(0);
  const [selectedXDelta, setSelectedXDelta] = useState(0);

  useEffect(() => {
    if (selectedEl) {
      const rect = selectedEl.getBoundingClientRect();
      const width = rect.width / 2;
      setSelectedWidth(width);
      const wholeLeft = containerRef.current?.getBoundingClientRect().left ?? 0;
      setSelectedXDelta(rect.left - wholeLeft + width / 2);
    }
  }, [selectedEl]);

  return (
    <Nav ref={containerRef}>
      <Bar animate={{ left: selectedXDelta, width: selectedWidth }} />
      {menuItems.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => setCurrentSelected(i)}
            onMouseEnter={() => setCurrentHovered(i)}
            onMouseLeave={() => setCurrentHovered(null)}
          >
            <MenuItem
              {...item}
              isHovered={i === currentHovered}
              isSelected={i === currentSelected}
              isDark={currentHovered !== null}
              onSelected={setSelectedEl}
            />
          </div>
        );
      })}
    </Nav>
  );
};

export default Menu;
