const React = require('react')
const {asGridItem} = require('pydio').requireLib('components')

class ThemeableTitle extends React.Component{

    render(){
        const {pydio, filterByType, muiTheme} = this.props;
        const messages = pydio.MessageHash;
        const bgColor = filterByType === 'entries' ? muiTheme.palette.primary1Color : MaterialUI.Style.colors.teal500;
        const title = messages[filterByType==='entries'?468:469];
        const cardTitleStyle = {backgroundColor:bgColor, color: 'white', padding: 16, fontSize: 24, lineHeight:'36px'};

        return <MaterialUI.Paper zDepth={0} rounded={false} style={cardTitleStyle}>{title}</MaterialUI.Paper>;
    }

}

ThemeableTitle = MaterialUI.Style.muiThemeable()(ThemeableTitle);

let WorkspacesListCard = React.createClass({

    render: function(){
        const {pydio, filterByType} = this.props;
        let props = {...this.props};
        if(props.style){
            props.style = {...props.style, overflowY:'auto', zIndex: 1};
        }

        const blackAndWhiteTitle = <MaterialUI.CardTitle title={pydio.MessageHash[filterByType==='entries'?468:469]}/>;
        const themedTitle = <ThemeableTitle {...this.props}/>;


        return (
            <MaterialUI.Paper zDepth={1} {...props} transitionEnabled={false} rounded={false}>
                {this.props.closeButton}
                <div  style={{height: '100%', display:'flex', flexDirection:'column'}}>
                    <PydioWorkspaces.WorkspacesListMaterial
                        className={"vertical_fit filter-" + filterByType}
                        pydio={pydio}
                        workspaces={pydio.user ? pydio.user.getRepositoriesList() : []}
                        showTreeForWorkspace={false}
                        filterByType={this.props.filterByType}
                        sectionTitleStyle={{display:'none'}}
                        style={{flex:1, overflowY: 'auto'}}
                    />
                </div>
            </MaterialUI.Paper>
        );
    }
});

WorkspacesListCard = asGridItem(WorkspacesListCard,'My Workspaces',{gridWidth:2,gridHeight:60},[]);
export {WorkspacesListCard as default}