import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Views */
import HomeView from './pages/HomeView/HomeView';
import MenuView from './pages/MenuView/MenuView';

import { PRIMARY_MENU } from './data/menus';
import FormulaView from './pages/FormulaView/FormulaView';
import { MathJaxContext } from 'better-react-mathjax';

setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<MathJaxContext>
					{PRIMARY_MENU.map((item) => (
						<Route key={`route-${item.id}`} exact path={item.path}>
							<MenuView
								menu={item.submenu}
								title={item.title}
								image={item.icon}
							/>
						</Route>
					))}
					<Route exact path='/formula/:id'>
						<FormulaView />
					</Route>
					<Route exact path='/'>
						<HomeView />
					</Route>
				</MathJaxContext>
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);

export default App;
