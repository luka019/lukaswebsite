import {practiceGroups} from './practice-structure.mjs';
import {practices} from '../catalogue.mjs';
export const groupRoutes={"ai":"/services/ai/","privacy":"/services/privacy-and-cybersecurity/","contracts":"/services/contracts/","products":"/services/digital-products-and-ip/","fintech":"/services/fintech-and-financial-regulation/","corporate":"/services/corporate-and-commercial/"};
export const groupRoute=g=>groupRoutes[g.key];
export const groupedPages=practiceGroups.filter(g=>g.ids.length>1);
const names={'/services/':{ka:'მომსახურება',en:'Practice areas'},'/advisory/':{ka:'AI და სამართალი',en:'AI and law'},'/business/':{ka:'ბიზნესსექტორები',en:'Sectors'},'/solutions/':{ka:'კონკრეტული საკითხები',en:'Focused engagements'},'/resources/':{ka:'კვლევები და ანალიტიკა',en:'Insights'},'/':{ka:'მთავარი',en:'Home'}};
export function parentsFor(route){
 const parents=['/'];
 const root=['/services/','/advisory/','/business/','/solutions/','/resources/'].find(p=>route!==p&&route.startsWith(p));
 if(root)parents.push(root);
 if(route==='/fees/')parents.push('/services/');
 if(root==='/services/'){
  const p=practices.find(p=>route==='/services/'+p.slug+'/');
  const group=p&&practiceGroups.find(g=>g.ids.includes(p.id));
  if(group&&groupRoute(group)!==route)parents.push(groupRoute(group));
 }
 return parents.map(url=>({url,name:names[url]||practiceGroups.find(g=>groupRoute(g)===url)?.name||{ka:url,en:url}}));
}
