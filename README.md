node-openshiftclient
====================

OpenShift API client

## Method naming

Our method names correspond with the scenario's described in the OpenShift 2.0
REST API guide. But we leave the user scope out of the name, because all the
scenario's are scoped to the user identified by the authKey or username and
password. So `List User Applications` becomes `listApplications`.

## Supported methods

### List User Applications

    listApplications()

Build status:
[![Wercker status](https://app.wercker.com/status/c216248c1083a323e82673cbdefcb32c/m)](https://app.wercker.com/project/bykey/c216248c1083a323e82673cbdefcb32c)
