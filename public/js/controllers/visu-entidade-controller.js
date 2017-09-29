angular.module('cidadesdigitais').controller('visuEntidadeController', function($scope, $http, $routeParams, $resource){
    
    $scope.entidades = [];
    $scope.busca = '';
    $scope.mensagem = '';
    
     


    if ($routeParams.entidadeId) {
        $http.get({
            entidadeId: $routeParams.entidadeId
        }, function (entidade) {
            $scope.entidade = entidade;
        }, function (erro) {
            $scope.mensagem = "Não é possivel retorna o entidade";
        });
    }


    $http.get('read/entidades')
        .success(function (entidade) {
            $scope.entidades = entidade
        })
        .error(function (error) {
            console.log(error);
        });

    
    
    
    
    $scope.remover = function (entidade) {

        $http.delete('read/entidades/' + entidade.cnpj)
            .success(function() {
            
            var indiceEntidade = $scope.entidades.indexOf(entidade);
              $scope.entidades.splice(indiceEntidade, 1);
            $scope.mensagem = 'Entidade ' + entidade.nome + ' foi deletado com sucesso!';
            
            })
            .error(function (erro) {
            $scope.mensagem = 'não foi possivel remover o entidade ' + entidade.nome;
                console.log('não foi possivel remover o entidade ' + entidade.nome);
            });
    };

    
});